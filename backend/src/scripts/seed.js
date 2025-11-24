require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Task = require('../models/Task');

const seed = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@salahelec.com';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@123';

    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      admin = await User.create({
        name: 'SalahElec Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log(`✅ Admin user created (${adminEmail} / ${adminPassword})`);
    } else {
      console.log(`ℹ️ Admin already exists (${adminEmail})`);
    }

    const employeesData = [
      {
        name: 'Field Engineer',
        email: 'field@salahelec.com',
        password: 'Field@123',
        role: 'employee'
      },
      {
        name: 'Project Coordinator',
        email: 'coord@salahelec.com',
        password: 'Coord@123',
        role: 'employee'
      }
    ];

    const employees = [];

    for (const data of employeesData) {
      let user = await User.findOne({ email: data.email });
      if (!user) {
        user = await User.create(data);
        console.log(`✅ Employee created (${data.email})`);
      } else {
        console.log(`ℹ️ Employee already exists (${data.email})`);
      }
      employees.push(user);
    }

    if (!employees.length) {
      console.log('⚠️ No employees found/created, skipping task seeding.');
      return process.exit(0);
    }

    const existingTasks = await Task.countDocuments();
    if (existingTasks > 0) {
      console.log('ℹ️ Tasks already exist, skipping task creation.');
      return process.exit(0);
    }

    const tasksPayload = [
      {
        title: 'Install solar inverter at Site A',
        description: 'Coordinate with the logistics team, ensure safety checklist is signed.',
        priority: 'high',
        status: 'open',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        project: 'Site A Upgrade',
        assignee: employees[0]._id,
        createdBy: admin._id
      },
      {
        title: 'Prepare weekly project report',
        description: 'Compile the KPIs, overdue tasks, and upcoming milestones.',
        priority: 'medium',
        status: 'open',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        project: 'Operations',
        assignee: employees[1]._id,
        createdBy: admin._id
      }
    ];

    await Task.insertMany(tasksPayload);
    console.log('✅ Sample tasks created.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seed();

