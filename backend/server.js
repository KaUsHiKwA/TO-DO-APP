import express from 'express';
import './config/env.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hi there!!");
});

app.listen(process.env.PORT || 5000, err => {
    if (err) console.log("Error Connecting: " + err);
    console.log(`Server running at http://localhost:${process.env.PORT}`)
});

export default app;