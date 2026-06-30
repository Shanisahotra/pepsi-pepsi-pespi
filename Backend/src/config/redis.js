import { createClient } from "redis"

const redisClient = createClient({
  url: process.env.REDIS_URL,
})

redisClient.on("error", (err) =>
  console.log("Redis Client Error:", err)
)

redisClient.on("ready", () =>
  console.log("Redis connected successfully")
)

//await redisClient.connect()

export default redisClient