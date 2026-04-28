const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ProfileRouter = require('./routes/ProfileRouter');
const matchRoutes = require("./routes/match.js");
const chatRoutes = require('./routes/chatRoutes');
const skillRoutes = require("./routes/skillRoutes");
require('dotenv').config();
require('./models/db');


const PORT = process.env.PORT || 8080 ;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter)
app.use('/profile', ProfileRouter);
app.use("/matches", matchRoutes);
app.use('/chat', chatRoutes);
app.get("/", (req, res) => res.send("SkillSwap API running"));
app.use("/api", skillRoutes);
app.listen(PORT, ()=>{
    console.log(`app is listening to ${PORT}`);
})