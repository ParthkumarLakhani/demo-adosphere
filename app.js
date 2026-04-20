require('dotenv').config();
const express = require("express")
const app = express()
const db = require("./config/database");


//allow for all
app.use(cors());

app.get('/', (req, res) => {
  res.send('Success')
})



app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Running on ${process.env.PORT}`);
})

