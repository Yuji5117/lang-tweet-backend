import Twitter from "twitter";

// TODO: node_mudulesを直接undefinedを許容するように一時的に修正。後ほど、修正必要あり
const client: Twitter = new Twitter({
  consumer_key: process.env.TWITTER_APP_API_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_APP_API_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_APP_API_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_APP_API_ACCESS_TOKEN_SECRET,
});

export default client;
