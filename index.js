const app = require('express')();
const server = require('http').createServer(app);
const db = require('./connectivity/mySql');

const io = require('socket.io')(server, {
    cors: {
      origin: "https://localhost:3000",
      methods: ["GET", "POST"]
    }
  });


app.get('/server', (req, res)=>{
    res.send("This is backend!");
})

db.query("SELECT * FROM user", (e, r, f)=>{
    console.log(r)
})

io.on('connection', (socket) => { 
    console.log("User Connected!!");
    socket.on('disconnect', ()=>{
        console.log("Disconnected!!!");
    })

    setTimeout(()=>{
        io.emit("mmm", {data: "Data Updated"})
    }, 6000)

    socket.on("msg", (data) => {
        console.log(data);
    })
 });

server.listen(5000, ()=>{
    console.log("Server running!");
});