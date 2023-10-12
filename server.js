const express = require('express');
const app = express();
const cors = require('cors');

const itemRouter = require("./routes/itemRoute")

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use("/item", itemRouter)

app.listen(5050, (req,res)=> {
    console.log(`Server running on 5050`);
})