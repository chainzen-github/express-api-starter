import { MongoClient } from 'mongodb';

const {
  MONGO_HOST,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_DBNAME,
  MONGO_LOCAL,
  MONGO_ATLAS,
  NODE_ENV,
} = process.env;

let MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;

if (MONGO_LOCAL) {
  MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
}
if (MONGO_ATLAS) {
  MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.pkla2kh.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;
}

export const client = new MongoClient(MONGO_URI);
export const db = client.db();

// optional connect 
if ( NODE_ENV === 'production') {
  const connect = async () =>{
    await client.connect();
  };

  connect();
}
