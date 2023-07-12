const storageKey = "theme-preference";

const onClick = () => {
  // flip current value
  theme.value = theme.value === "light" ? "dark" : "light";

  setPreference();
};

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.firstElementChild.setAttribute("data-theme", theme.value);

  document
    .querySelector("#theme-toggle")
    ?.setAttribute("aria-label", theme.value);

  changeColors(theme.value);
};

const theme = {
  value: getColorPreference(),
};

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference();

  // now this script can find and listen for clicks on the control
  document.querySelector("#theme-toggle").addEventListener("click", onClick);
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    theme.value = isDark ? "dark" : "light";
    setPreference();
  });

function changeColors(theme) {
  let doc = document.documentElement;
  if (theme == "light") {
    doc.style.setProperty("--MainBackground", "#fafafa");
    doc.style.setProperty("--SecondaryColor", "#e9e2e4");
    doc.style.setProperty("--SecondaryBackground", "#f5f5f5");
    doc.style.setProperty("--AccentColor", "#574246");
    doc.style.setProperty("--Text-Color", "#050505");
  } else {
    doc.style.setProperty("--MainBackground", "#050505");
    doc.style.setProperty("--SecondaryColor", "#1d1618");
    doc.style.setProperty("--SecondaryBackground", "#0b0b0b");
    doc.style.setProperty("--AccentColor", "#bda8ac");
    doc.style.setProperty("--Text-Color", "#fafafa");
  }
}

// Media query

let nav = document.querySelector("header .nav");
let menuIcon = document.querySelector("header svg")
let closeMenu = document.querySelector(".nav svg")

function myFunction(x) {
  if (x.matches) {
    document.body.prepend(nav)
    nav.style.left = "-250px";
    menuIcon.onclick = ()=>{
      nav.classList.add('show-mobile')
      nav.style.left = "0"
      nav.style.opacity = "1";
    }
    closeMenu.onclick = () =>{
      nav.classList.remove("show-mobile");
      nav.style.left = "-250px"
      nav.style.opacity = "0";
    }
  }else{
    document.querySelector("#theme-toggle").before(nav)
    nav.style.opacity = "1";
    nav.style.left = "50%";
  }
}
let x = window.matchMedia("(max-width: 767px)");
myFunction(x);
x.addEventListener("change", myFunction);
