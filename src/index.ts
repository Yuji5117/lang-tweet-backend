import express from "express";
// import client from "./api/twitter";
import Twitter from "twitter";
import axios from "axios";
import { TwitterApi } from "twitter-api-v2";
require("dotenv").config();

let client: Twitter;

const clientTwitter = new TwitterApi({
  appKey: process.env.TWITTER_APP_API_CONSUMER_KEY,
  appSecret: process.env.TWITTER_APP_API_CONSUMER_SECRET,
  // appKey: process.env.TWITTER_APP_API_CONSUMER_KEY,
  // appSecret: process.env.TWITTER_APP_API_CONSUMER_SECRET,
});

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

  console.log("client", client);

  try {
    await client.post("statuses/update", { status: tweetTemplate });
  } catch (e) {
    console.log(e);
  }

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

// app.post("/likes", async (req, res) => {
// await client.get(
//   "statuses/user_timeline",
//   req.body.test,
//   function (error, tweets, response) {
//     console.log(tweets);
//     if (!error) {
//       client.post("favorites/create", { id: tweets[10].id_str });
//       console.log("ライクです", error);
//     } else {
//       console.log("エラーです", error);
//     }
//   }
// );

//   res.status(200).json({
//     data: {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Credentials": true,
//       },
//       body: "ライクしました！！",
//     },
//   });
// });

app.post("/login", async (req, res) => {
  const authLink = await clientTwitter.generateAuthLink(
    "http://localhost:3000/callback/twitter.html"
  );

  const { oauth_token, oauth_token_secret } = authLink;

  client = new Twitter({
    consumer_key: process.env.TWITTER_APP_API_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_APP_API_CONSUMER_SECRET,
    access_token_key: oauth_token,
    access_token_secret: oauth_token_secret,
  });

  res.status(200).json({
    data: {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "テスt",
    },
  });
});

app.listen(3000);
