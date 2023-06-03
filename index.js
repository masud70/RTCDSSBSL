const express = require("express");
const dotenv = require("dotenv");
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
    checkLogin,
} = require("./middlewares/common");
const userRouter = require("./router/userRouter");
const employeeRouter = require("./router/employeeRouter");
const postRouter = require("./router/postRouter");
const { upload, updateDatabase } = require("./middlewares/common/imageUpload");
const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const userMutations = require("./graphql/user/mutations");
const postMutations = require("./graphql/post/mutations");
const userQuery = require("./graphql/user/query");
const postQuery = require("./graphql/post/query");
const { graphqlHTTP } = require("express-graphql");

io.on("connection", (socket) => {
    socket.on("disconnect", () => {
        socket.disconnect();
    });
    socket.on("toBack", (data) => {
        console.log(data);
    });
});

global.io = io;
app.use((req, res, next) => {
    req.io = io;
    req.db = db;
    return next();
});

// QraphQL
const Query = new GraphQLObjectType({
    name: "Query",
    fields: { ...userQuery, ...postQuery },
});
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        ...userMutations,
        ...postMutations,
    }),
});
app.use(
    "/graphql",
    graphqlHTTP({
        graphiql: true,
        schema: new GraphQLSchema({
            query: Query,
            mutation: Mutation,
        }),
    })
);

//database connection
// mongoose
//     .connect(process.env.MONGO_CONNECTION_STRING, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log("Database connection successful!");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

//routing setup
app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.use("/post", postRouter);

app.post("/upload", checkLogin, upload.single("image"), updateDatabase);

app.use(notFoundHandler);
app.use(errorHandler);

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
