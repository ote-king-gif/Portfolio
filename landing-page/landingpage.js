// ==============================
// LANDING PAGE JAVASCRIPT
// ==============================

const header = document.getElementById("header");
const form = document.getElementById("form");
const email = document.getElementById("email");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const pricingButtons = document.querySelectorAll(".btn");


// ==============================
// 1. HEADER SCROLL EFFECT
// ==============================

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.boxShadow = "none";
  }
});


// ==============================
// 2. SMOOTH NAVIGATION
// ==============================

navLinks.forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    const targetId = link.getAttribute("href");

    const targetSection =
      document.querySelector(targetId);

    if (targetSection) {

      targetSection.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});


// ==============================
// 3. ACTIVE NAV LINK
// ==============================

const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {
            link.style.color = "#000";
          });

          const activeLink =
            document.querySelector(
              `.nav-link[href="#${entry.target.id}"]`
            );

          if (activeLink) {
            activeLink.style.color = "darkorange";
          }

        }

      });

    },
    {
      threshold: 0.5
    }
  );


sections.forEach(section => {
  sectionObserver.observe(section);
});


// ==============================
// 4. EMAIL FORM VALIDATION
// ==============================

form.addEventListener("submit", event => {

  const emailValue = email.value.trim();

  if (!emailValue) {

    event.preventDefault();

    showMessage(
      "Please enter your email address."
    );

    return;
  }


  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (!emailPattern.test(emailValue)) {

    event.preventDefault();

    showMessage(
      "Please enter a valid email address."
    );

    return;
  }

});


// ==============================
// 5. PRICING BUTTONS
// ==============================

pricingButtons.forEach(button => {

  button.addEventListener("click", () => {

    const product =
      button
        .closest(".pricing1")
        .querySelector("h3")
        .textContent;

    const price =
      button
        .closest(".pricing1")
        .querySelector("h2")
        .textContent;

    showMessage(
      `${product} selected - ${price}`
    );

  });

});


// ==============================
// 6. MESSAGE FUNCTION
// ==============================

function showMessage(message) {

  let messageBox =
    document.getElementById("messageBox");


  if (!messageBox) {

    messageBox =
      document.createElement("div");

    messageBox.id = "messageBox";

    document.body.appendChild(messageBox);


    messageBox.style.position = "fixed";
    messageBox.style.bottom = "25px";
    messageBox.style.left = "50%";
    messageBox.style.transform =
      "translateX(-50%)";

    messageBox.style.backgroundColor =
      "#333";

    messageBox.style.color = "#fff";

    messageBox.style.padding =
      "12px 20px";

    messageBox.style.borderRadius =
      "5px";

    messageBox.style.zIndex = "2000";

    messageBox.style.fontSize =
      "14px";

  }


  messageBox.textContent = message;


  setTimeout(() => {

    messageBox.remove();

  }, 3000);

}


// ==============================
// 7. SCROLL TO TOP BUTTON
// ==============================

const topButton =
  document.createElement("button");

topButton.textContent = "↑";

topButton.setAttribute(
  "aria-label",
  "Scroll to top"
);


topButton.style.position = "fixed";
topButton.style.bottom = "25px";
topButton.style.right = "25px";
topButton.style.width = "45px";
topButton.style.height = "45px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.backgroundColor = "#f1c40f";
topButton.style.fontSize = "20px";
topButton.style.fontWeight = "bold";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.zIndex = "1500";


document.body.appendChild(topButton);


// Show button after scrolling

window.addEventListener("scroll", () => {

  if (window.scrollY > 400) {

    topButton.style.display = "block";

  } else {

    topButton.style.display = "none";

  }

});


// Scroll to top

topButton.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});