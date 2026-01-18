export const getApiError = (error) => {
  if (!error.response || !error.response.data) {
    return "Something went wrong. Please try again later.";
  }

  const data = error.response.data;

  // Case 1: Custom "response" key keys (e.g. from check_username, check_email, or manual views)
  if (data.response) {
    return data.response;
  }

  // Case 2: Custom "error" key
  if (data.error) {
    return data.error;
  }

  // Case 3: DRF "detail" key (Authentication/Permission errors)
  if (data.detail) {
    return data.detail;
  }

  // Case 4: Array of errors (e.g. ["Invalid code for verification status."])
  if (Array.isArray(data)) {
    return data[0];
  }

  // Case 5: Field-specific errors (e.g. { field_name: ["Error message"] })
  // We take the first key that isn't 'status_code' or similar if mixed in.
  const keys = Object.keys(data);
  if (keys.length > 0) {
    const firstKey = keys[0];
    const firstError = data[firstKey];
    const message = Array.isArray(firstError) ? firstError[0] : firstError;
    
    // If it's a non_field_error, just return the message
    if (firstKey === "non_field_errors") {
      return message;
    }
    
    // Otherwise return "Field: Message"
    // Capitalize first letter of key for better readability
    const fieldLabel = firstKey.charAt(0).toUpperCase() + firstKey.slice(1).replace(/_/g, " ");
    return `${fieldLabel}: ${message}`;
  }

  return "An unexpected error occurred.";
};
