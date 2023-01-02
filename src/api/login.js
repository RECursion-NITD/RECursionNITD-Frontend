// define apis for login
export const loginUser = async (formData) => {
  const response = await fetch(
    "http://recursionnitd.pythonanywhere.com/api/token/",
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
};
