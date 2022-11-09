import createServer from "./utils/server.js";
import connect from "./utils/connect.js";
import dotenv from 'dotenv';

// To run the server as normal, simply use "npm run dev" in the terminal
dotenv.config();
const app = createServer();
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Application is listening on port ${port}...`);
    await connect();
});