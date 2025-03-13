import { passwordInput, PUE_input, instaLogo } from "./util.js";

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (isDarkMode) {
  instaLogo.style.backgroundPosition = "0px 0px";
} else {
  instaLogo.style.backgroundPosition = "0px -52px";
}

window.onload = () => {
  passwordInput.value = "";
  PUE_input.value = "";
};
