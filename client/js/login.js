const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const messageElement = document.getElementById("message");
const loginButton = document.getElementById("login");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const username = usernameField.value.trim();
  const password = passwordField.value.trim();

  if (!username || !password) {
    messageElement.textContent = "Please fill in both username and password";
    return;
  }

  try {
    const response = await fetch("http://localhost:3002/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful, handle the response data
      localStorage.setItem("app-token", data.token);
      location.href = `${data.role}/index.html`;
    } else {
      console.log(data);
      // Login failed, handle the error
      messageElement.textContent = `Error: ${data.error}`;
    }
  } catch (error) {
    console.error(error);
    messageElement.textContent = "Error: Unable to login";
  }
});
