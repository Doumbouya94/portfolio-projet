const express = require("express");
const http    = require("http");
const cors    = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// ─── Socket.IO ──────────────────────────────
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

// ─── Rooms prédéfinies ───────────────────────
const rooms = {
    "Recrutement": { users: [], messages: [] },
    "Generale":    { users: [], messages: [] },
    "Support":     { users: [], messages: [] },
};

// ─── Route REST ─────────────────────────────
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/rooms", (req, res) => {
    const list = Object.entries(rooms).map(([name, data]) => ({
        name,
        count: data.users.length,
    }));
    res.json(list);
});

// ─── Socket.IO events ────────────────────────
io.on("connection", (socket) => {
    console.log(`✅ Connecté : ${socket.id}`);

    // Envoyer la liste des rooms
    socket.emit("rooms_list", getRoomsList());

    // ── Rejoindre une room ──────────────────
    socket.on("join_room", ({ username, room }) => {
        if (!rooms[room]) rooms[room] = { users: [], messages: [] };

        socket.join(room);
        socket.currentRoom = room;
        socket.currentUsername = username;

        if (!rooms[room].users.find(u => u.socketId === socket.id)) {
            rooms[room].users.push({ socketId: socket.id, username });
        }

        console.log(`👤 ${username} → room "${room}"`);

        // Message système
        io.to(room).emit("receive_message", {
            author:  "Système",
            message: `${username} a rejoint le chat 💬`,
            time:    now(),
            system:  true,
        });

        io.to(room).emit("room_users", rooms[room].users);
        io.emit("rooms_list", getRoomsList());
    });

    // ── Envoyer un message ──────────────────
    socket.on("send_message", (data) => {
        console.log(`💬 "${data.author}" → "${data.room}": ${data.message}`);
        io.to(data.room).emit("receive_message", data);
    });

    // ── Indicateur de frappe ────────────────
    socket.on("typing", ({ username, room }) => {
        socket.to(room).emit("user_typing", { username });
    });

    socket.on("stop_typing", ({ room }) => {
        socket.to(room).emit("user_stop_typing");
    });

    // ── Quitter une room ────────────────────
    socket.on("leave_room", ({ username, room }) => {
        socket.leave(room);
        if (rooms[room]) {
            rooms[room].users = rooms[room].users.filter(u => u.socketId !== socket.id);
            io.to(room).emit("receive_message", {
                author:  "Système",
                message: `${username} a quitté le chat 👋`,
                time:    now(),
                system:  true,
            });
            io.to(room).emit("room_users", rooms[room].users);
            io.emit("rooms_list", getRoomsList());
        }
    });

    // ── Déconnexion ─────────────────────────
    socket.on("disconnect", () => {
        const room     = socket.currentRoom;
        const username = socket.currentUsername;
        if (!room || !rooms[room]) return;

        rooms[room].users = rooms[room].users.filter(u => u.socketId !== socket.id);
        console.log(`❌ ${username} déconnecté`);

        io.to(room).emit("receive_message", {
            author:  "Système",
            message: `${username} a quitté le chat 👋`,
            time:    now(),
            system:  true,
        });
        io.to(room).emit("room_users", rooms[room].users);
        io.emit("rooms_list", getRoomsList());
    });
});

// ─── Helpers ────────────────────────────────
function now() {
    return new Date().toLocaleTimeString("fr-FR", {
        hour:   "2-digit",
        minute: "2-digit",
    });
}

function getRoomsList() {
    return Object.entries(rooms).map(([name, data]) => ({
        name,
        count: data.users.length,
    }));
}

// ─── Démarrage ──────────────────────────────
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 Serveur Socket.IO sur http://localhost:${PORT}`);
});