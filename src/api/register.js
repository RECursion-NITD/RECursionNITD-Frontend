// define apis for login
export const register = async (formData) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/users/register/", // TODO : use axios
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword
      }),
    }
  );
  const data = await response.json();
  console.log("data", data);
  return data;
};
