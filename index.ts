import express from "express";
import expenseRoutes from './routes/expenses'
import bodyParser from "body-parser";
import cors from "cors";
const port: number = 8000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", expenseRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running at port:${port}`);
});