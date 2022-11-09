import mongoose from "mongoose";

export default async function connect() {
    try {
        // Mongoose Setup (Connection to MongoDB)
        await mongoose
        .connect(process.env.MONGO_URI)
        .then((arg) => {
            console.log("Connection to MongoDB successful.");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB", error);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}