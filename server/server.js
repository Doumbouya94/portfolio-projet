const express = require("express");
const http    = require("http");
const cors    = require("cors");
const path    = require("path");
const { Server } = require("socket.io");

// ─── Init ────────────────────────────────────
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// ─── Base de données ─────────────────────────
require('./config/db.js');

// ─── Routes API REST ─────────────────────────
app.use('/api/auth',     require('./routes/auth.routes.js'));
app.use('/api/projects', require('./routes/projects.routes.js'));
app.use('/api/skills',   require('./routes/skills.routes.js'));
app.use('/api/contact',  require('./routes/contact.routes.js'));

// ─── Health check ─────────────────────────────
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ─── Error middleware ─────────────────────────
app.use(require('./middleware/error.middleware.js'));

// ─── Socket.IO ───────────────────────────────
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (origin.includes("localhost")) return callback(null, true);
            if (origin.endsWith(".vercel.app")) return callback(null, true);
            return callback(null, true);
        },
        methods: ["GET", "POST"],
    },
});

// ─── Rooms ───────────────────────────────────
const rooms = {
    "Recrutement": { users: [] },
    "Generale":    { users: [] },
    "Support":     { users: [] },
};

function now() {
    return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function getRoomsList() {
    return Object.entries(rooms).map(([name, data]) => ({
        name, count: data.users.length,
    }));
}

io.on("connection", (socket) => {
    console.log(`✅ Connecté : ${socket.id}`);
    socket.emit("rooms_list", getRoomsList());

    socket.on("join_room", ({ username, room }) => {
        if (!rooms[room]) rooms[room] = { users: [] };
        socket.join(room);
        socket.currentRoom = room;
        socket.currentUsername = username;

        if (!rooms[room].users.find(u => u.socketId === socket.id)) {
            rooms[room].users.push({ socketId: socket.id, username });
        }

        io.to(room).emit("receive_message", {
            author: "Système", message: `${username} a rejoint le chat 💬`,
            time: now(), system: true,
        });
        io.to(room).emit("room_users", rooms[room].users);
        io.emit("rooms_list", getRoomsList());
    });

    socket.on("send_message", (data) => {
        io.to(data.room).emit("receive_message", data);
    });

    socket.on("typing", ({ username, room }) => {
        socket.to(room).emit("user_typing", { username });
    });

    socket.on("stop_typing", ({ room }) => {
        socket.to(room).emit("user_stop_typing");
    });

    socket.on("leave_room", ({ username, room }) => {
        socket.leave(room);
        if (rooms[room]) {
            rooms[room].users = rooms[room].users.filter(u => u.socketId !== socket.id);
            io.to(room).emit("receive_message", {
                author: "Système", message: `${username} a quitté le chat 👋`,
                time: now(), system: true,
            });
            io.to(room).emit("room_users", rooms[room].users);
            io.emit("rooms_list", getRoomsList());
        }
    });

    socket.on("disconnect", () => {
        const room     = socket.currentRoom;
        const username = socket.currentUsername;
        if (!room || !rooms[room]) return;
        rooms[room].users = rooms[room].users.filter(u => u.socketId !== socket.id);
        io.to(room).emit("receive_message", {
            author: "Système", message: `${username} a quitté le chat 👋`,
            time: now(), system: true,
        });
        io.to(room).emit("room_users", rooms[room].users);
        io.emit("rooms_list", getRoomsList());
    });
});

// ─── Démarrage ───────────────────────────────
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 Serveur sur http://localhost:${PORT}`);
    console.log(`📋 API disponible sur http://localhost:${PORT}/api`);
});