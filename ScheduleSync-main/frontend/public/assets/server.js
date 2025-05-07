const express = require('express');  
const http = require('http');  
const socketIO = require('socket.io');  
const path = require('path'); // Import path module  

const app = express();  
const server = http.createServer(app);  
const io = socketIO(server);  

// Serve the User.html file at the root path  
app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, 'User.html')); // Adjust if it's in a different folder  
});  

// Serve static files (like CSS, images) if necessary  
app.use('/assets', express.static(path.join(__dirname, 'Assets'))); // Adjust to your assets folder  

// Handle socket connections  
io.on('connection', (socket) => {  
    console.log('New client connected');  

    socket.on('sendMessage', (message) => {  
        io.emit('receiveMessage', message); // Broadcast the message  
    });  

    socket.on('disconnect', () => {  
        console.log('Client disconnected');  
    });  
});  

// Start the server  
server.listen(3000, () => {  
    console.log('Server is running on port 3000');  
});