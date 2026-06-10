import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import contentRoutes from "./routes/contentRoutes";
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/contents", contentRoutes);

app.listen(PORT, () => {
  console.log(`server is started on ${PORT}`);
});
