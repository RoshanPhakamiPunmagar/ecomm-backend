// server.js
import config from "./src/config/config.js";
import { connectMongoDB } from "./src/config/db.js";
import app from "./app.js";

const PORT = config.port || 5000;

const startServer = async () => {
  try {
    await connectMongoDB();
    console.log("MongoDB connected.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}.`);
    });
  } catch (error) {
    console.error("Failed to start server.", error);
    process.exit(1);
  }
};

startServer();
