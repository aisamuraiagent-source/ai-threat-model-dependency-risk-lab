const MAX_INPUT_LENGTH = 128;
const LOCAL_PATH_PATTERN = /^\/[A-Za-z0-9._~/?#[\]@!$&'()*+,;=:%-]*$/;

function normalizeInput(rawInput) {
  if (typeof rawInput !== "string") {
    return {
      valid: false,
      value: null,
      reason: "input_must_be_string"
    };
  }

  const value = rawInput.trim();

  if (value.length === 0) {
    return {
      valid: false,
      value: null,
      reason: "input_required"
    };
  }

  if (value.length > MAX_INPUT_LENGTH) {
    return {
      valid: false,
      value: null,
      reason: "input_too_long"
    };
  }

  if (!LOCAL_PATH_PATTERN.test(value)) {
    return {
      valid: false,
      value: null,
      reason: "input_must_be_local_path"
    };
  }

  return {
    valid: true,
    value,
    reason: null
  };
}

module.exports = {
  MAX_INPUT_LENGTH,
  normalizeInput
};
