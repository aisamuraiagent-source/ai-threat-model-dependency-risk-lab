function authorizeDemoRequest(requestMetadata) {
  const role = requestMetadata && requestMetadata.role ? requestMetadata.role : "guest";

  return {
    allowed: role === "admin",
    role
  };
}

module.exports = {
  authorizeDemoRequest
};
