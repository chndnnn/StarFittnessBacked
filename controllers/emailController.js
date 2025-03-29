import fs from 'fs';
import createTransporter from '../config/nodemailerConfig.js';
import { promisify } from 'util';

export const sendEmail = async (filePath) => {
  try {
    // Check if the filePath is valid and file exists
    if (!filePath || !fs.existsSync(filePath)) {
      console.log('File not found! Aborting email send.');
      return;
    }

    // Get current date and time in the format YYYY-MM-DD_HH-MM-SS
    const currentDate = new Date();
    const dateStr = currentDate
      .toISOString()
      .replace(/T/, '_')
      .replace(/\..+/, '')
      .replace(/:/g, '-'); // Format: "2025-03-28_14-30-00"
    const filename = `members_data_${dateStr}.xlsx`; // New file name with date and time

    // Create reusable transporter object using the default SMTP transport
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Star Fitness Weekly Member Data Report',
      text: 'Please find the attached Excel file with the latest member data.',
      attachments: [
        {
          filename: filename, // Use the dynamically created filename
          path: filePath, // Path to the generated Excel file
        },
      ],
    };

    // Promisify the sendMail function
    const sendMailAsync = promisify(transporter.sendMail).bind(transporter);

    // Send the email
    const info = await sendMailAsync(mailOptions);

    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
};

