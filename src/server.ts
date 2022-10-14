import * as express from "express";
import router from "./routes/routes";
import connection from "./config/config";
import { json, urlencoded } from "body-parser";
import * as dotent from "dotenv";
import * as cors from "cors";
dotent.config();

connection
  .sync()
  .then(() => console.log("Connected with sucess to database"))
  .catch(() => console.log("Connection failed to database"));

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => console.log("Server Online!"));
