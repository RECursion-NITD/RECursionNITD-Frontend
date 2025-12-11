/* eslint-disable */
// define apis for login with google
export const loginWithGoogle = async (token) => {
  const response = await fetch(
    "https://recursion70.pythonanywhere.com/token/google/", // TODO : use axios
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
  console.log("google token data", data);
  return data;
};
