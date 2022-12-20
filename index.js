const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
dotenv.config();

//request parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//Imports
const {
    notFoundHandler,
    errorHandler,
} = require("./middlewares/common/errorHandler");
const userRouter = require("./router/userRouter");
const employeeRouter = require("./router/employeeRouter");
const { checkLogin } = require("./middlewares/common/checkLogin");
const { upload } = require("./middlewares/common/imageUpload");
const {
    dataChecker,
} = require("./socketRouteHandler/employeeDataChecker/checker");

// socket connection
const io = require("socket.io")(server, {
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"],
    },
});
app.use((req, res, next) => {
    req.io = io;
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
//signup router
app.use("/user", userRouter);
app.use("/employee", employeeRouter);

app.get("/", checkLogin, (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

//avatar upload
app.post("/uploadAvatar", upload.single("avatar"), (req, res, next) => {
    console.log(req.file);
    res.json({
        status: true,
        message: "Upload successful!",
    });
});

//404 not found
app.use(notFoundHandler);

//error handler
app.use(errorHandler);

io.on("connection", (socket) => {
    // console.log("User Connected with id " + socket.id);
    socket.on("disconnect", () => {
        console.log(socket.id + " disconnected!!!");
    });

    socket.on("employeeDataChecking", async (data) => {
        const result = await dataChecker(data);
        socket.emit("employeeDataCheckingResult", result);
    });
});

server.listen(process.env.PORT, () => {
    console.log("Server running @ " + process.env.PORT);
});
