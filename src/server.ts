import app from "./app";
import configs from "./config";
import { connectToDB } from "./database/connection";

async function runServer() {
  try {
    await connectToDB();
    app.listen(configs.PORT, () => {
      console.log(`User Service running on Port: ${configs.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

runServer();
