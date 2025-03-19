require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
 
const mainRoute = require('./routes/user.routes');
app.use('/api', mainRoute);

async function main() {
    await mongoose.connect(process.env.MONGODB);
}

main()
    .then(() => console.log('Db is connected..............'))
    .catch(err => console.log('Error connecting DB...', err));

app.listen(port, () => {
    console.log(`Start server at http://localhost:${port}`);
});
