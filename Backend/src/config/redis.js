import { createClient } from "redis"

const redisClient = createClient({
  username: "default",
  password: "fUMCJ4vhMn4N9BosE5CD7Wrg8fIIveuq",
  socket: {
    host: "redis-14502.c246.us-east-1-4.ec2.cloud.redislabs.com",
    port: 14502,
  },
})

redisClient.on("error", (err) =>
  console.log("Redis Client Error:", err)
)

redisClient.on("ready", () =>
  console.log("✅ Redis connected successfully")
)

await redisClient.connect()

export default redisClient