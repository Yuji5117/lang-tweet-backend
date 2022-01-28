import express from "express";
import client from "./api/twitter";
const router = express.Router();

const app: express.Express = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  }
);

app.post("/tweet", async (req, res) => {
  console.log(req.body.test);

  await client.post("statuses/update", { status: req.body.test });

  res.status(200).json({
    data: {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "ツイートされました！！",
    },
  });
});

app.listen(3000);
