// define apis for login
export const login = async (formData) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/token/`, // TODO : use axios
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    }
  );
  const data = await response.json();

  return data;
};
