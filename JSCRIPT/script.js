const menuOpen = document.querySelector("#menu-open-button");
const menuClose = document.querySelector("#menu-close-button");

menuOpen.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
})
menuClose.addEventListener("click", () => 
    menuOpen.click());
