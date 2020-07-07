var menuBtn = document.getElementById("menu-button");
function toggleMenu() {
    menuBtn.classList.toggle("tapped");
};
menuBtn.addEventListener("click", toggleMenu, false);
console.log(menuBtn)