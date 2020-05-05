require('dotenv').config();

export default {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    mongo_connection_url: process.env.MONGO_URL || "mongodb://localhost:27017/jobsremotely",
    session_keys: process.env.KEEYS || ["local", "local2"],
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_access_secret: process.env.AWS_SECRET_ACCESS_KEY,
    salt_rounds: 10,
    cors: process.env.CORS || "http://localhost:8080",
    url: "localhost:3000" || process.env.url,
    test_mail: process.env.TEST_MAIL,
    hostname: process.env.HOST || "http://localhost:8080",
    chargeAmount: parseInt(process.env.PRICE) || 4999,
    stripe_secret: process.env.STRIPE_SECRET
}