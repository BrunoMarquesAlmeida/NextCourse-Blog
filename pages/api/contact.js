import { MongoClient } from "mongodb";

const { MONGO_CONNECTION } = process.env;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, message, name } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(MONGO_CONNECTION);
    } catch (err) {
      res.status(500).json({ message: "Could not connect to database", err });

      console.log(err);
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      client.close();
      res.status(500).json({ message: "Storing message failed", err });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", newMessage });
  }
}
