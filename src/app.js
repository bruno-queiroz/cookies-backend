const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const allowedUrls = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5174",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedUrls.indexOf(origin || "") !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
  sameSite: "none",
  secure: true,
};

app.get("/add-cookie", (req, res) => {
  console.log("testing route add");

  res.cookie("cookie-test", "test values", cookieOptions);

  res.json({ msg: "cookie added" });
});

app.get("/remove-cookie", (req, res) => {
  console.log("testing route remove");

  res.clearCookie("cookie-test", cookieOptions);

  res.json({ msg: "cookie removed" });
});

app.listen(port, () => console.log("runninggggg"));
