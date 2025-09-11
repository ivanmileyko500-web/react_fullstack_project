const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); 
app.use(express.json()); 

const DatabaseManager = require('./src/databaseManager');
const dbManager = new DatabaseManager('userData');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});