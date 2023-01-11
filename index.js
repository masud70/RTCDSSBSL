const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const db = require("./models");
const { Server } = require("socket.io");
const io = new Server(server);
dotenv.config();
const bcrypt = require("bcrypt");

//request parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));

//Imports
const {
    notFoundHandler,
    errorHandler,
} = require("./middlewares/common");
const userRouter = require("./router/userRouter");
const employeeRouter = require("./router/employeeRouter");
const { upload } = require("./middlewares/common/imageUpload");

app.use((req, res, next) => {
    req.io = io;
    req.db = db;
    return next();
});

//database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connection successful!");
    })
    .catch((err) => {
        console.log(err);
    });

//routing setup
app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.post("/uploadAvatar", upload.single("avatar"), (req, res, next) => {
    console.log(req.file);
    res.json({
        status: true,
        message: "Upload successful!",
    });
});
app.use(notFoundHandler);
app.use(errorHandler);

io.on("connection", (socket) => {
    // console.log("User connected");
    socket.on("disconnect", () => {
        // console.log("User disconnected");
        socket.disconnect();
    });
    socket.on("toBack", (data) => {
        console.log(data);
    });
});

server.listen(process.env.PORT, () => {
    db.sequelize
        .sync({ alter: true })
        .then(() => {
            console.log(
`================================
App listening to port ${process.env.PORT}
Database connection successfully
================================`
            );
        })
        .catch((err) => {
            console.log(err.message);
        });
});
