import express from "express";
import routes from "../routes.js";
import cors from 'cors';

export default function createServer() {
    const app = express();
    app.use(express.json());
    app.use(cors());
    routes(app);
    return app;
}
