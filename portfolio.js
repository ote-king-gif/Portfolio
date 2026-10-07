// ===============================
// DARK / LIGHT MODE
// ===============================

const themeButton = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute(
    "data-theme",
    savedTheme
  );
}


function updateThemeIcon() {

  const currentTheme =
    document.documentElement.getAttribute(
      "data-theme"
    );

  if (currentTheme === "dark") {

    themeButton.textContent = "☀️";

    themeButton.setAttribute(
      "aria-label",
      "Switch to light mode"
    );

  } else {

    themeButton.textContent = "🌙";

    themeButton.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );

  }

}


updateThemeIcon();


themeButton.addEventListener(
  "click",
  () => {

    const currentTheme =
      document.documentElement.getAttribute(
        "data-theme"
      );

    const newTheme =
      currentTheme === "dark"
        ? "light"
        : "dark";

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

    localStorage.setItem(
      "theme",
      newTheme
    );

    updateThemeIcon();

  }
);


// ===============================
// MOBILE MENU
// ===============================

const menuButton =
  document.getElementById("menu-btn");

const navigation =
  document.getElementById("nav-links");


menuButton.addEventListener(
  "click",
  () => {

    const isOpen =
      navigation.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen
    );

    menuButton.textContent =
      isOpen ? "✕" : "☰";

  }
);


// Close menu after clicking a link

const navItems =
  navigation.querySelectorAll("a");


navItems.forEach((item) => {

  item.addEventListener(
    "click",
    () => {

      navigation.classList.remove("open");

      menuButton.textContent = "☰";

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );

});


// ===============================
// CURRENT YEAR
// ===============================

const year =
  document.getElementById("year");

year.textContent =
  new Date().getFullYear();

