import mongoose from 'mongoose';
import app from './app.js';

const { DB_HOST, PORT = 3002 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running at ${PORT} port`));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
