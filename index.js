const fetch = require("isomorphic-fetch");
const cors = require("cors");
const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/plugins/rpc/oneway/:id", async (req, res) => {
  try {
    const auth = req.headers["authorization"];

    // console.log({ auth, id: req.params.id, body: req.body });

    const response = await fetch(
      `https://iot-test.auomesh.io/api/plugins/rpc/oneway/${req.params.id}`,
      {
        method: "POST",
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(req.body),
      }
    );
    if (!(response.status + "").startsWith("2"))
      throw new Error("Permission deny");

    const json = await response.json();

    res.json(json);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.listen(5001, () => console.log("Port start at 5001"));
