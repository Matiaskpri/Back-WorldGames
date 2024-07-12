const express = require('express');
const gamesRoutes = require('./src/routers/gamesRoutes');
const authRoutes = require('./autenticacion/routes/authRoutes');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use('/games',gamesRoutes);
app.use('/auth', authRoutes);


app.listen(port , ()=>{
    console.log(`el servidor esta encendido en http://localhost:${port}`);
});