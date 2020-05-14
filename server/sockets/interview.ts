import { Server } from "socket.io";

let interview = {
    code: "",
    messages: [],
    output: ""
}

export function interviewRoom(io: Server) {
    io.on("connection", (socket) => {
        console.log("New client connected");
 
        socket.emit("connected", interview);
        socket.on("message", (message: string) => {
            interview.messages.push(message);
            socket.broadcast.emit("message", interview.messages);
        });

        socket.on("code", (code: string) => {
            interview.code = code;
            socket.broadcast.emit("code", interview.code);
        });

        socket.on("output", (output: string) => {
            interview.output = output;
            socket.broadcast.emit("output", interview.output);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}