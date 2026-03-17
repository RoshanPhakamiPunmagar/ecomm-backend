import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  mongo: {
    url: process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce-db",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expires: process.env.JWT_EXPIRES || "1d",
  },
  renewJwt: {
    secret: process.env.JWT_RENEW_SECRET || "renew-secret",
    expires: process.env.JWT_RENEW_EXPIRES || "1d",
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },

  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  clientURL: process.env.CLIENT_URL || "http://localhost:5173",
};

export default config;
