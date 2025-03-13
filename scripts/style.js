// This script is for styling for like dynamically manipulating html elements

// This scripts needs a lot of improvement I don't consider this code as very good and well structured code

setTimeout(() => {
  splashScreenDiv.style.display = "none";
  loginScreenDiv.style.display = "block";
}, 2000);

import { PUE_input, passwordInput, loginButton } from "./util.js";

const splashScreenDiv = document.querySelector("#splash-screen");
const loginScreenDiv = document.querySelector("#mount_0_0_fL");

const passwordShowButton = document.querySelector("#showButton");

const inputHandler = (e) => {
  if (e.target.value !== "") {
    e.target.parentElement.classList.add("_aa49");

    // This approach isn't good but because the application isn't too complex then for now it's fine.
    if (e.target.name === "password") {
      passwordShowButton.style.display = "block";
    }
  } else {
    e.target.parentElement.classList.remove("_aa49");

    if (e.target.name === "password") {
      passwordShowButton.style.display = "none";
    }
  }

  if (PUE_input.value !== "" && passwordInput.value !== "") {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
};

PUE_input.addEventListener("input", inputHandler);

passwordInput.addEventListener("input", inputHandler);

passwordShowButton.addEventListener("click", (e) => {
  if (e.target.textContent === "Show") {
    passwordInput.type = "text";

    e.target.textContent = "Hide";
  } else {
    passwordInput.type = "password";

    e.target.textContent = "Show";
  }
});
