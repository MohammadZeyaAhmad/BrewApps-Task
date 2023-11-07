require("dotenv").config();
require("express-async-errors");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
require("express-async-errors");
const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 500,
  })
);
app.use(helmet());
app.use(
  cors({
    methods: "GET, POST, PUT,PATCH,DELETE",
  })
);

app.use((req, res, next) => {
  console.log("origin ", req.headers.origin);
  let allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:8000",
  ];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Credentials", "TRUE");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("Strict-Transport-Security", "max-age=31536000");
  res.header("X-Frame-Options", "SAMEORIGIN");
  res.header("X-Content-Type-Options", "nosniff");

  if (res.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(204).json({});
  }
  next();
});
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/BrewApps", bookRoutes);



app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
