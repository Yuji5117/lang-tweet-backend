import express from "express";
import client from "./api/twitter";

require("dotenv").config();

const app: express.Express = express();
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
  const { tweetKr, tweetJp } = req.body;
  const tweetTemplate = `＜簡単表現＞\n\n【韓国語】\n・${tweetKr}\n\n【日本語】\n・${tweetJp}\n\n#韓国語 #ハングル #korean #勉強`;

  await client.post("statuses/update", { status: tweetTemplate });

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
