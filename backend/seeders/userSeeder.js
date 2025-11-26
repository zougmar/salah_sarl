import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import User from '../models/User.model.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const mongoDbName = process.env.MONGO_DB_NAME || 'salahelec';
const mongoConnectionString = mongoUri.includes('mongodb+srv') || mongoUri.includes('?')
  ? mongoUri
  : `${mongoUri}/${mongoDbName}`;

// Default users data
const defaultUsers = [
  {
    name: 'Admin User',
    email: 'admin@salahelec.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Employee',
    email: 'john@salahelec.com',
    password: 'employee123',
    role: 'employee'
  },
  {
    name: 'Jane Employee',
    email: 'jane@salahelec.com',
    password: 'employee123',
    role: 'employee'
  },
  {
    name: 'Mike Employee',
    email: 'mike@salahelec.com',
    password: 'employee123',
    role: 'employee'
  }
];

// Function to seed users
const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoConnectionString);
    console.log('Connected to MongoDB');

    // Check if users already exist
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seeding.');
      return;
    }

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      defaultUsers.map(async (user) => {
        const hashedPassword = await bcryptjs.hash(user.password, 12);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert users into database
    await User.insertMany(hashedUsers);
    console.log('Default users created successfully');

    // Log the created users (without passwords)
    console.log('Created users:');
    defaultUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });

  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the seeder
seedUsers();
