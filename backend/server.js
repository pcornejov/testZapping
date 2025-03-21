require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const session = require("express-session");

app.use(
    session({
        secret: "1,!5]1>^Z7va",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

if (!process.env.MONGO_URI) {
    console.error("Error: La variable MONGO_URI no está definida en el archivo .env");
    process.exit(1); 
}

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/stream", require("./routes/streamRoutes"));


app.use(express.static(path.join(__dirname, "../frontend")));


app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});


app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

const authenticateSession = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send("Acceso denegado. Por favor, inicia sesión.");
    }
    next();
};


app.get("/player", authenticateSession, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/player.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));