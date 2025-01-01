import * as mongoDB from "mongodb";

export const collections: { 
  user?: mongoDB.Collection, 
  project?: mongoDB.Collection,
  chat?: mongoDB.Collection 
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongocluser_URL_");

  try {
    await client.connect();
    const db: mongoDB.Db = client.db("Project");

    collections.user = db.collection("users");
    collections.project = db.collection("projects");
    collections.chat = db.collection("chats");

    console.log(`Successfully connected to database: ${db.databaseName}`);
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}
