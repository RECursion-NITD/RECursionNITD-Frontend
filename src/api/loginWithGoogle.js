/* eslint-disable */
// define apis for login with google
export const loginWithGoogle = async (token) => {
  const response = await fetch(
    "http://127.0.0.1:8000/token/google/", // TODO : use axios
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

  return data;
};
