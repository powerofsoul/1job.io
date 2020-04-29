export default {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    mongo_connection_url: process.env.MONGO_URL || "mongodb://localhost:27017/jobsremotely",
    session_keys: process.env.KEEYS || ["local", "local2"],
    salt_rounds: 10,
    url: "localhost:3000" || process.env.url
}