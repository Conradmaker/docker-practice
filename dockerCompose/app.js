import express from "express";
import redis from "redis";

const client = redis.createClient({
  socket: {
    host: "redis-server", //도커환경과 일반환경의 설정법이 다르다.
    port: 6379,
  },
});

const app = express();

app.get("/", async (req, res, next) => {
  try {
    await client.connect();
    let number = await client.get("number");
    if (number === null) {
      number = 0;
    }
    console.log("Number: " + number);
    res.send("숫자가 1씩 올라갑니다. 숫자: " + number);
    await client.set("number", parseInt(number) + 1);
    await client.disconnect();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

app.listen(8080, () => console.log("server is running"));
