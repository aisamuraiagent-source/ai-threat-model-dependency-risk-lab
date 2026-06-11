const http = require("http");
const { normalizeInput } = require("./input-handler");
const { authorizeDemoRequest } = require("./auth");

const port = 3000;

const server = http.createServer((req, res) => {
  const input = normalizeInput(req.url || "");
  const auth = authorizeDemoRequest({
    role: req.headers["x-demo-role"]
  });

  const response = {
    status: "local-demo-only",
    input,
    authorization: auth,
    note: "This is a controlled defensive lab baseline. Do not deploy."
  };

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response, null, 2));
});

if (require.main === module) {
  server.listen(port, () => {
    console.log("Local defensive demo running.");
  });
}

module.exports = {
  server
};
