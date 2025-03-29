import app from './app.js'
import dotenv from 'dotenv';
import connectDB from './db.js';
dotenv.config();



const port = process.env.PORT;
connectDB();
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  