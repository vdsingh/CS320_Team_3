import mongoose from "mongoose";
import { mongoURI } from "../secret.js";

export default async function connect() {
    try {
        // Mongoose Setup (Connection to MongoDB)
        await mongoose
        .connect(mongoURI)
        .then((arg) => {
            console.log("Connection to MongoDB successful.");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB", error);
        });

        // PORT setup
        // const port = process.env.PORT || 3000;
        // app.listen(port, () =>
        //     console.log(`Application is listening on port ${port}...`)
        // );
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}