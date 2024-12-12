const express = require('express');
const cors = require("cors");
const app = express();
// const server = http.createServer(app);
const userRoutes = require('./router/userRoutes');
const http = require("http");
const { Server } = require("socket.io");
const PORT = 3001;

app.use(express.json());

const server = http.createServer(app);




app.use(cors());
app.use('/api/users', userRoutes);
// Define a simple route
// app.get('/', (req, res) => {
//     res.send('Hello, Express!');
// });



const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // React app URL
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for events from the client
    socket.on("message", (data) => {
        console.log("Message received:", data);

        // Broadcast the message to all connected clients
        io.emit("message", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});