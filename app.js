import express from 'express'
import dotenv from 'dotenv'; 
dotenv.config();  
import userRouter from './routers/user.js';
import cors from 'cors';
import nodeCron from 'node-cron';
import { generateExcel } from './controllers/excelController.js';
import { sendEmail } from './controllers/emailController.js';


const app = express();
app.use(cors())
app.use(express.json());

// 
setInterval(() => {
    fetch('https://starfittnessbacked.onrender.com/keep-alive')
      .then((res) => res.text())
      .then(() => {
        console.log('Ping sent to keep server alive');
      })
      .catch((err) => console.error('Error sending ping:', err));
  }, 14 * 60 * 1000); 
    
  nodeCron.schedule('0 0 * * 0', async () => {
    console.log('This task runs every Sunday at midnight.');// Logs the task execution
  
    // Generate the Excel file and wait for the result
    const excelFilePath = await generateExcel();
    if (excelFilePath) {
        console.log('Excel file generated at:', excelFilePath); // Log the file path
  
        // Send the Excel file via email
        await sendEmail(excelFilePath);
        console.log("Email send triggered...");
    } else {
        console.log('Excel file generation failed, skipping email send.');
    }
});

app.get('/keep-alive', (req, res) => {
    res.status(200).send('Server is alive!');
  });

app.use('/starFitness/v1',userRouter)

export default app



