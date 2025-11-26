# Database Seeders

This directory contains seeder scripts for the SalahElecSarl application.

## User Seeder

The user seeder (`userSeeder.js`) creates default admin and employee users for the application.

### Default Users

The seeder creates the following default users:

1. **Admin User**
   - Email: admin@salahelec.com
   - Password: admin123
   - Role: admin

2. **John Employee**
   - Email: john@salahelec.com
   - Password: employee123
   - Role: employee

3. **Jane Employee**
   - Email: jane@salahelec.com
   - Password: employee123
   - Role: employee

4. **Mike Employee**
   - Email: mike@salahelec.com
   - Password: employee123
   - Role: employee

### How to Run the Seeder

To run the user seeder, execute the following command from the backend directory:

```bash
npm run seed
```

### Important Notes

- The seeder checks if an admin user already exists. If it finds one, it will skip the seeding process to avoid creating duplicate users.
- After seeding, you can log in with any of the default users using their email and password.
- For security reasons, consider changing the default passwords after the initial setup.
