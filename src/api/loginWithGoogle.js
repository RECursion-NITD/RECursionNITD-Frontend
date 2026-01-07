/* eslint-disable */
// define apis for login with google
export const loginWithGoogle = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/token/google/`, // TODO : use axios
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
