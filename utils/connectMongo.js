import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let client = null;

const connectMongo = async () => {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('new')
  }
  
  return client;
};

export default connectMongo;