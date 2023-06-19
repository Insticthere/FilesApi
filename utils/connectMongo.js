import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()

const connectMongo = async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client;
};

export default connectMongo;