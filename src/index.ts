import express from "express";
import cors from "cors";
import user from "./routes/user";
import { authMiddleware } from "./middlewere/auth";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/user', authMiddleware, user);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
