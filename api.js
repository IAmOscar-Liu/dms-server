const fetch = require("isomorphic-fetch");

const auth = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZkbXN0ZW5hbnRAYXVvZGlzcGxheXBsdXMub3JnIiwidXNlcklkIjoiOGM1MzEwODAtMjZjOS0xMWVlLThkODYtODUwODczOWI4NTcyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiIzMjU4N2I3OC04MzZiLTQ2ZmYtYWRlMy01ZGFiODZkMDI1ZDkiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY5MDc5MzAyNiwiZXhwIjoxNjkwODAyMDI2LCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiZjlhMjJmYzAtMjZjNi0xMWVlLThkODYtODUwODczOWI4NTcyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.-SHmcfIgbZPx2RMuD5Ve-gN97LtJ0QFBN-NUkXJVRQ-QzrePIZ2JKLBSYQPCWPAWnY1TVaZLhQdhsqtEeUmuxg`;

fetch(
  `https://iot-test.auomesh.io/api/plugins/rpc/oneway/c2ec7c10-2f63-11ee-8d86-8508739b8572`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify({
      method: "method_screen_on",
      params: {
        value: 1,
      },
    }),
  }
)
  .then((res) => console.log("status code: ", res.status))
  .then((error) => console.log(error));
