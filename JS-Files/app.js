/* *************************  Dark Mode ************************************* */

const icon = document.getElementById("icon");
const container = document.body;

if (localStorage.getItem("data-theme")) {
  container.setAttribute("class", localStorage.getItem("data-theme"));
  toggleDark(1);
}

function toggleDark(r) {
  const dataTheme = container.getAttribute("class");
  let theme_switch;

  if (dataTheme === "light") {
    theme_switch = 1;
  } else {
    theme_switch = 0;
  }
  if (r) {
    theme_switch = !theme_switch;
  }
  if (theme_switch) {
    container.setAttribute("class", "dark");
    icon.setAttribute("src", "./Image/sun.png");
    localStorage.setItem("data-theme", "dark");
  } else {
    container.setAttribute("class", "light");
    icon.setAttribute("src", "./Image/moon.png");
    localStorage.setItem("data-theme", "light");
  }
}
/************************************************************************************* */