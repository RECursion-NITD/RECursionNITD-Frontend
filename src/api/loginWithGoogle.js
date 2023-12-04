/* eslint-disable */
// define apis for login with google
export const loginWithGoogle = async (token) => {
  const response = await fetch(
    // "https://recnitdgp.pythonanywhere.com/api/tokenforgoogle/", // for production
    "http://127.0.0.1:8000/api/tokenforgoogle/", // for development
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    }
  );
  const data = await response.json();
  console.log("data", data);
  return data;
};
