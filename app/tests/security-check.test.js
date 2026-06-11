const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { authorizeDemoRequest } = require("../src/auth");
const { MAX_INPUT_LENGTH, normalizeInput } = require("../src/input-handler");
const { server } = require("../src/server");

test("request-controlled admin role no longer grants access", () => {
  const result = authorizeDemoRequest({ role: "admin" });

  assert.deepEqual(result, {
    allowed: false,
    policy: "local-demo-deny-by-default",
    reason: "Privileged access is disabled for this local demo."
  });
});

test("input handler validates and normalizes local path input", () => {
  assert.deepEqual(normalizeInput("  /demo/path?item=1  "), {
    valid: true,
    value: "/demo/path?item=1",
    reason: null
  });
});

test("input handler returns structured invalid output", () => {
  assert.deepEqual(normalizeInput(123), {
    valid: false,
    value: null,
    reason: "input_must_be_string"
  });

  assert.deepEqual(normalizeInput("not-a-local-path"), {
    valid: false,
    value: null,
    reason: "input_must_be_local_path"
  });
});

test("input handler rejects overlong input", () => {
  const overlongInput = `/${"a".repeat(MAX_INPUT_LENGTH)}`;

  assert.deepEqual(normalizeInput(overlongInput), {
    valid: false,
    value: null,
    reason: "input_too_long"
  });
});

test("server applies defensive JSON headers", async () => {
  await new Promise((resolve, reject) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const request = http.get(
        {
          hostname: "127.0.0.1",
          port: address.port,
          path: "/demo",
          headers: {
            "x-demo-role": "admin"
          }
        },
        (response) => {
          response.resume();
          response.on("end", () => {
            try {
              assert.equal(response.headers["content-type"], "application/json; charset=utf-8");
              assert.equal(response.headers["x-content-type-options"], "nosniff");
              assert.equal(response.headers["cache-control"], "no-store");
              assert.equal(response.headers["referrer-policy"], "no-referrer");
              assert.equal(
                response.headers["content-security-policy"],
                "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"
              );
              resolve();
            } catch (error) {
              reject(error);
            }
          });
        }
      );

      request.on("error", reject);
    });
  }).finally(() => {
    server.close();
  });
});
