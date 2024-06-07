const express = require("express");
const cors = require("cors");
const webpush = require("web-push");

const app = express();
const apiKeys = {
  publicKey:
    "BPwVfYduULFiBvqu_tKFJcWkUJr7f42zI-DV9vGyWoOBapaYL_CApkc5ynwiPEGTSHRPj1geAViLxnIfJk_nCjY",
  privateKey: "RFdShtMbHXPzCeziV4hBJTYJ9ZB6qGJQmaqsQ6GT0Hw",
};

webpush.setVapidDetails(
  "mailto:thinkpad111222@gmail.com",
  apiKeys.publicKey,
  apiKeys.privateKey
);

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

const database = [];

app.post("/save_subscription", (req, res) => {
  database.push(req.body);
  res.json({ status: "success", message: "subsciption saved!" });
});

app.get("/send-notification", (req, res) => {
  webpush.sendNotification(database[0], "hello world");
  res.json({ status: "success", message: "message sent to push service" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
