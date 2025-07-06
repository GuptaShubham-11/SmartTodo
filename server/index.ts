import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

import { dbToConnect } from './db/db';
import { app } from './app';
import { setupServer } from './socket';
import http from 'http';

dbToConnect()
  .then(() => {
    if (!process.env.CLIENT_URL) {
      throw new Error('CLIENT_URL environment variable is not set');
    }

    const port = process.env.PORT || 8000;

    const server = http.createServer(app);
    const io = setupServer(server);

    app.locals.io = io;

    app.on('error', (error: any) => {
      console.error('❌ UNEXPECTED ERROR:', error.message);
      process.exit(1);
    });

    app.listen(port, () => {
      console.log(`🚀 Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(`❌ MongoDB connection error:`, error);
    process.exit(1);
  });
