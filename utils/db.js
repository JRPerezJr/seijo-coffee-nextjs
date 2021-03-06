import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  if(process.env.NODE_ENV !== 'production'){
    const dbUri =  process.env.MONGODB_URI
    const db = await mongoose.connect(dbUri);
    console.log('new connection established');
    connection.isConnected = db.connections[0].readyState;
  }
  const db = await mongoose.connect(MONGO_ATLAS_URI);
    console.log('new connection established');
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };

export default db;
