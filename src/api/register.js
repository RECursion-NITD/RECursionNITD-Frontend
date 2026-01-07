// define apis for login
export const register = async (formData) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/register/`, // TODO : use axios
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

  return data;
};
