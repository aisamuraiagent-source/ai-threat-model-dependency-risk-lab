function authorizeDemoRequest() {
  return {
    allowed: false,
    policy: "local-demo-deny-by-default",
    reason: "Privileged access is disabled for this local demo."
  };
}

module.exports = {
  authorizeDemoRequest
};
