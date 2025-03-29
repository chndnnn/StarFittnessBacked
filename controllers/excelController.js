import XLSX from 'xlsx';
import path from 'path';
import User from '../schemas/user.js'; // Import User model
import { fileURLToPath } from 'url';  // Import the necessary utility
import fs from 'fs';

export const generateExcel = async () => {   
  try {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const users = await User.find();
    if (!users || users.length === 0) {
      console.log('No users found in the database.');
      return null;
    }

    const data = users.map((member) => ({
      Name: member.name,
      Phone: member.number,
      Address: member.address,
      Price: member.price,
      SubscriptionDuration: `${member.subscriptionDuration} months`,
      StartDate: member.startDate,
      EndDate: member.endDate,
    }));

    // Create Excel worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Members');

    // Define file path to save the Excel file
    const filePath = path.join(__dirname, 'members_data.xlsx');
    // Write Excel file
    XLSX.writeFile(wb, filePath);
    console.log('Excel file generated at:', filePath);

    // Check if the file exists before returning the file path
    if (fs.existsSync(filePath)) {
      console.log('File exists and is ready to be sent.');
    } else {
      console.error('File does not exist!');
      return null;
    }

    return filePath;
  } catch (error) {
    console.error('Error writing Excel file:', error);
  }
};


