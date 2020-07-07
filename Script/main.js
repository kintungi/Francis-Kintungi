const elNav = document.getElementById("nav"); //binding the navigation menu
const elBody = document.getElementById("page");
const menuBtn = document.getElementById("menu-button");
const inquiryList = document.getElementById("options");
const inquiry = document.getElementById("inquiry");
const inquiryLine = document.getElementById("inquiry-line");
console.log(inquiryLine);
function toggleMenu() {
    menuBtn.classList.toggle("tapped");
    elNav.classList.toggle("show");
};
menuBtn.addEventListener("click", toggleMenu, false);
const closeBtn = document.getElementById("close"); //binding the svg icon that closes the navigation menu
const openBtn = document.getElementById("open"); //binding the menu svg that opens the navigation menu
closeBtn.addEventListener("click", () => {elNav.style.width = "0%"; elBody.style.overflowY = "scroll"}, false);
//script for inquiry dropdown options
const arrowBtn = document.getElementById("drop");
const optionList = document.getElementById("options");
function toggleDropdown() {
    optionList.classList.toggle("open"); 
    arrowBtn.classList.toggle("up");
    inquiryLine.classList.toggle("focus");//doesnt work fix it
}
arrowBtn.addEventListener("click", toggleDropdown, false);
//script to change the inquiry
function selectItem(e) {
    let target = e.target;
    let selected = target.textContent;
   if (target.className === "list-item"){ inquiry.textContent = selected;
    toggleDropdown();
}
}
inquiryList.addEventListener("click", selectItem, false);
inquiry.addEventListener("click", toggleDropdown, false);
console.log(inquiryList.firstChild.nextSibling.textContent);