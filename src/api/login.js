// define apis for login
export const login = async (formData) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/token/", // TODO : use axios
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
  console.log("data", data);
  return data;
};
