/* eslint-disable */
export const getProfileRoles = async (id) => {
    const token = JSON.parse(localStorage.getItem("authTokens")).access;
    const response = await fetch(
        // "https://recnitdgp.pythonanywhere.com/api/users/roles",
        "http://localhost:8000/api/users/roles",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
        }
    );
    const data = await response.json();
    console.log("data", data);
    return data;
};

