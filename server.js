import mongoose from 'mongoose';
import app from './app.js';

//XrWaqlQUnSonKb8S
const { DB_HOST, PORT = 3002 } = process.env;
// const DB_HOST =
//   'mongodb+srv://Olena:XrWaqlQUnSonKb8S@cluster0.4n3ip.mongodb.net/contacts-form?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running at ${PORT} port`));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
