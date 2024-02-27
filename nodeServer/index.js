// Node server handling socket.io connections
const io=require('socket.io')(8000,{cors:{origin:"*"}});

const users = {};

// When a new user joins
io.on('connection', (socket) => {
    // Event: new user joined
    
    socket.on('new-user-joined', (name) => {
        // Update users object
        users[socket.id] = name;
        // Broadcast to other users that a new user has joined
        socket.broadcast.emit('user-joined', name);
    });

    // Event: send message
    socket.on('send', (message) => {
        // Broadcast the message to other users
        socket.broadcast.emit('receive', { message, name: users[socket.id] });
    });

    // Event: user disconnects
    socket.on('disconnect', () => {
        // Broadcast to other users that a user has left
        socket.broadcast.emit('left', users[socket.id]);
        // Remove the user from the users object
        delete users[socket.id];
    });
});


// const io = require('socket.io')(8000);
// const users = {};

// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // Event: new user joined
//     socket.on('new-user-joined', (name) => {
//         users[socket.id] = name;
//         console.log(`${name} joined`);
//         // Broadcast to other users that a new user has joined
//         socket.broadcast.emit('user-joined', name);
//     });

//     // Event: send message
//     socket.on('send', (message) => {
//         console.log(`Message received from ${users[socket.id]}: ${message}`);
//         // Broadcast the message to other users
//         socket.broadcast.emit('receive', { message, name: users[socket.id] });
//     });

//     // Event: user disconnects
//     socket.on('disconnect', () => {
//         const disconnectedUser = users[socket.id];
//         console.log(`${disconnectedUser} left`);
//         // Broadcast to other users that a user has left
//         socket.broadcast.emit('left', disconnectedUser);
//         // Remove the user from the users object
//         delete users[socket.id];
//     });
// });

// io.on('error', (err) => {
//     console.error('Socket.IO Error:', err);
// });
