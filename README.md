# ALS (Adaptive Living Solutions ) Platform

This project uses a MongoDB database for data storage. Follow the steps below to set up and run the project.

## Setting Up the Database

To connect your MongoDB database, follow these steps:

1. **Create a `.env.local` File:**
   - In the root of the project, create a file named `.env.local`.
   - Add your MongoDB connection string to this file using a variable, for example:

     ```env
     URIMONGO=mongodb+srv://your-connection-string
     ```

   **Note:** This file is not included in the repository and needs to be created manually.

2. **Add the File to the Root:**
   - Ensure that the `.env.local` file is in the root directory of the project.

## Installing Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

And for development mode you can run the following command 
```bash
npm run dev
```
