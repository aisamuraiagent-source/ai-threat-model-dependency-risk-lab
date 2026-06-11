function normalizeInput(rawInput) {
  if (typeof rawInput !== "string") {
    return "";
  }

  return rawInput.trim();
}

module.exports = {
  normalizeInput
};
