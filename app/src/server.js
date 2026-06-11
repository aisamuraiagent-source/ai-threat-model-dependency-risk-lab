const http = require("http");
const { normalizeInput } = require("./input-handler");
const { authorizeDemoRequest } = require("./auth");

const port = 3000;

function applyJsonSecurityHeaders(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
}

const server = http.createServer((req, res) => {
  const input = normalizeInput(req.url || "");
  const auth = authorizeDemoRequest();

  const response = {
    status: "local-demo-only",
    input,
    authorization: auth,
    note: "This is a controlled defensive lab baseline. Do not deploy."
  };

  applyJsonSecurityHeaders(res);
  res.end(JSON.stringify(response, null, 2));
});

if (require.main === module) {
  server.listen(port, () => {
    console.log("Local defensive demo running.");
  });
}

module.exports = {
  applyJsonSecurityHeaders,
  server
};
