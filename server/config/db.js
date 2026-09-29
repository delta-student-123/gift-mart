import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/giftmart';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] Could not connect to local/remote MongoDB (${error.message}).`);
    console.log(`[MongoDB Notice] Running in Resilient In-Memory API Mode so all REST routes and client features work seamlessly.`);
    return false;
  }
};

export const getDbStatus = () => ({
  connected: isConnected,
  host: isConnected ? mongoose.connection.host : 'In-Memory Resilient Mock',
  name: isConnected ? mongoose.connection.name : 'giftmart-mock'
});
