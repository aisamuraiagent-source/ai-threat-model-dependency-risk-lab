const test = require("node:test");
const assert = require("node:assert/strict");
const { authorizeDemoRequest } = require("../src/auth");
const { normalizeInput } = require("../src/input-handler");

test("input handler normalizes string input", () => {
  assert.equal(normalizeInput("  /demo  "), "/demo");
});

test("baseline documents request-controlled admin role risk", () => {
  const result = authorizeDemoRequest({ role: "admin" });

  assert.equal(
    result.allowed,
    true,
    "Baseline intentionally documents this risk before remediation."
  );
});
