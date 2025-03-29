import User from "../schemas/user.js";
import moment from "moment";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); 
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const createUser = async (req, res) => {
    try {
      const { name, number, address, price, startDate, subscriptionDuration, endDate } = req.body;
  
      const newUser = new User({
        name,
        number,
        address,
        price,
        startDate,
        subscriptionDuration,
        endDate,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
              message: 'User with this name  already exists.',
            });
          }
      res.status(500).json({ message: 'Error creating user' });
    }
  };

  
  export const getUsersEndingSoon = async (req, res) => {
    try {
      const today = moment().startOf('day'); // Get today's date at 00:00 (start of day)
      const threeDaysFromNow = moment().add(3, 'days').toDate(); // Get the date 3 days from today
  
      // Find users whose 'endDate' is in the next 3 days and is not already expired
      const users = await User.find({
        endDate: { 
          $gte: today.toDate(), // endDate should be greater than or equal to today's date (not expired)
          $lte: threeDaysFromNow // endDate should be less than or equal to 3 days from now
        },
      });
  
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users with ending dates soon:', err);
      res.status(500).json({ message: 'Error fetching users' });
    }
  };
  
  
  // 2. Fetch users whose endDate < today
  export const getExpiredUsers = async (req, res) => {
    try {
      const today = moment().startOf('day').toDate(); // Get today's date at midnight
  
      const users = await User.find({
        endDate: { $lt: today }, // endDate < today
      });
  
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching expired users:', err);
      res.status(500).json({ message: 'Error fetching users' });
    }
  };


// Find user by ID
export const getUserById = async (req, res) => {
  try {
    // Get user ID from request params
    const { id } = req.params;

    // Find the user by ID in the database
    const user = await User.findById(id);

    // If no user is found, return 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data if found
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Update User by ID
export const updateUser = async (req, res) => {
  try {
    // Get user ID from request parameters
    const { id } = req.params;

    // Extract the fields to update from the request body
    const { name, number, address, price, startDate, subscriptionDuration, endDate } = req.body;

    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        number,
        address,
        price,
        startDate,
        subscriptionDuration,
        endDate,
        updatedAt: Date.now(), // Optionally, update the 'updatedAt' field
      },
      { new: true } // Return the updated document
    );

    // If no user is found, return 404
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user data
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
   
    res.status(500).json({ message: 'Error updating user' });
  }
};


export const searchUsersByName = async (req, res) => {
  try {
    // Extract 'name' from query parameters
    const { name } = req.query;

    // If no 'name' query parameter is provided, return an error
    if (!name) {
      return res.status(400).json({ message: 'Name query parameter is required' });
    }

    // Search users where 'name' contains the provided search term (case-insensitive)
    const users = await User.find({
      name: { $regex: name, $options: 'i' }  // 'i' makes it case-insensitive
    });

    // If no users are found, return an empty array
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found with the given name' });
    }

    // Return the found users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users by name:', error);
    res.status(500).json({ message: 'Error searching users' });
  }
};


// Delete User by ID
export const deleteUser = async (req, res) => {
    try {
      // Get user ID from request parameters
      const { id } = req.params;
  
      // Find the user by ID and delete them
      const deletedUser = await User.findByIdAndDelete(id);
  
      // If no user is found, return 404
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return success message
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };
  

