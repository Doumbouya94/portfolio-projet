// Constantes des événements Socket.IO
export const EVENTS = {
    // Émis par le client
    JOIN_ROOM:    'join_room',
    LEAVE_ROOM:   'leave_room',
    SEND_MESSAGE: 'send_message',
    TYPING:       'typing',
    STOP_TYPING:  'stop_typing',

    // Reçus du serveur
    RECEIVE_MESSAGE: 'receive_message',
    ROOM_USERS:      'room_users',
    ROOMS_LIST:      'rooms_list',
    USER_TYPING:     'user_typing',
    USER_STOP_TYPING:'user_stop_typing',
};