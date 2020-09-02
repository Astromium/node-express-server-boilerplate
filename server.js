const mongoose = require('mongoose');
const dotenv = require('dotenv')

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception... Shutting Down');
    console.error(err);
    process.exit(1)
});

dotenv.config({ path: './config.env' })

const app = require('./app');

// connecting to db

mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(console.log('DB Connected Succesfully'))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server Running on Port ' + port))


process.on('unhandledRejection', (err) => {
    console.log('Unhadled Rejection :(  Shutting Down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});