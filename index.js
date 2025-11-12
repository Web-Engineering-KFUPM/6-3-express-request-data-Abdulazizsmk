const express = require("express");
const app = express();

// TODO-1: Server setup
app.listen(3000, () => {
  console.log("API running at http://localhost:3000");
});

// Root test route
app.get("/", (req, res) => {
  res.send("Server is up!");
});

// TODO-2: /echo
app.get("/echo", (req, res) => {
  const { name, age } = req.query;
  if (!name || !age) {
    return res.status(400).json({ ok: false, error: "name & age required" });
  }
  res.json({ ok: true, name, age, msg: `Hello ${name}, you are ${age}` });
});

// TODO-3: /profile/:first/:last
app.get("/profile/:first/:last", (req, res) => {
  const { first, last } = req.params;
  res.json({ ok: true, fullName: `${first} ${last}` });
});

// TODO-4: app.param("userId")
app.param("userId", (req, res, next, userId) => {
  const num = Number(userId);
  if (isNaN(num) || num <= 0) {
    return res
      .status(400)
      .json({ ok: false, error: "userId must be positive number" });
  }
  req.userIdNum = num;
  next();
});

// TODO-5: /users/:userId
app.get("/users/:userId", (req, res) => {
  res.json({ ok: true, userId: req.userIdNum });
});
