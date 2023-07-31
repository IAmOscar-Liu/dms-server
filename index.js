const fetch = require("isomorphic-fetch");
const cors = require("cors");
const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => res.json({ data: "123" }));

// app.get("/api/plugins/rpc/oneway/:id", async (req, res) => {
//   try {
//     // const auth = req.headers["authorization"];
//     const auth =
//       "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZkbXN0ZW5hbnRAYXVvZGlzcGxheXBsdXMub3JnIiwidXNlcklkIjoiOGM1MzEwODAtMjZjOS0xMWVlLThkODYtODUwODczOWI4NTcyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiI1NjM0NDQ5Ny03YWU0LTQ4ZmYtYTMwYi0yMjI4ZmVjNDgyMzgiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY5MDc4Njk0NiwiZXhwIjoxNjkwNzk1OTQ2LCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiZjlhMjJmYzAtMjZjNi0xMWVlLThkODYtODUwODczOWI4NTcyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.DBb3cfP71_5u8iMo2EQt0f1ABxEACq0GDmOrqMsgwLqwlinqOkRaYXKFSjV2WfFrehkyzChIbrJroLAYl0S8ig";
//     // console.log({ auth, id: req.params.id, body: req.body });

//     const response = await fetch(
//       `https://iot-test.auomesh.io/api/plugins/rpc/oneway/${req.params.id}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: auth,
//         },
//         body: JSON.stringify({
//           method: "method_screen_on",
//           params: {
//             value: 1,
//           },
//         }),
//       }
//     );
//     console.log(response.status);

//     if (!(response.status + "").startsWith("2"))
//       throw new Error("Permission deny");

//     // const json = await response.text();

//     // console.log(json);

//     res.json({ success: true });
//   } catch (error) {
//     // console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });

app.post("/api/plugins/rpc/oneway/:id", async (req, res) => {
  try {
    const auth = req.headers["authorization"];
    // const auth =
    //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZkbXN0ZW5hbnRAYXVvZGlzcGxheXBsdXMub3JnIiwidXNlcklkIjoiOGM1MzEwODAtMjZjOS0xMWVlLThkODYtODUwODczOWI4NTcyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiJmNDFlNjI0MC05MTg5LTRiYzMtYTdlNy03YjMxMGY0NThmMDYiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY5MDc4ODUzMSwiZXhwIjoxNjkwNzk3NTMxLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiZjlhMjJmYzAtMjZjNi0xMWVlLThkODYtODUwODczOWI4NTcyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.7aa580uGGB9snzVcFv5_fdiQNbA_rbWRcOJpV-4biPeyRJ6tVv6bS4Tb5m3kTEPsC9JQEHj6bsL7yb0O2W5Rqg";

    // console.log({ auth, id: req.params.id, body: req.body });
    // console.log(req.body);
    // console.log("req.body");

    const response = await fetch(
      `https://iot-test.auomesh.io/api/plugins/rpc/oneway/${req.params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify(req.body),
        // body: JSON.stringify({
        //   method: "method_screen_on",
        //   params: {
        //     value: 1,
        //   },
        // }),
      }
    );

    console.log(response.status);
    if (!(response.status + "").startsWith("2"))
      throw new Error("Permission deny");

    // const json = await response.json();

    res.json({ success: true });
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
