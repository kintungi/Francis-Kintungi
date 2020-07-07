const elNav = document.getElementById("nav"); //binding the navigation menu
const elBody = document.getElementById("page");
const menuBtn = document.getElementById("menu-button");
const inquiryList = document.getElementById("options");
const inquiry = document.getElementById("inquiry");
const inquiryLine = document.getElementById("inquiry-line");
const footerYear = document.getElementById("year");//binding the span that holds current year at the footer of the site
console.log(footerYear);
const currentYear = new Date().getFullYear();//fetching the value of current year from the date object
console.log(currentYear);
footerYear.textContent = currentYear;
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
    inquiryLine.classList.toggle("focus");
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
console.log(document.forms[0].elements[0])
/*The section that follows consists 
of form enhancement and validation*/
const nameInput = document.getElementById("name");//binding name element
const emailInput = document.getElementById("email");//binding email element
const companyInput = document.getElementById("company");//binding company element
const briefInput = document.getElementById("brief");//binding message element
const elForm = document.forms[0];//binding form element
const formValid = false; //A flag fo validating the form

/*Object to store form values*/
const formData = {
    inquiry: inquiry,
    Name: nameValue,
    Email: emailValue,
    Company: companyValue,
    Messsage: messageValue,
    Date: (() => {let today = new Date().getFullYear(); return today})
};
console.log(formData.Date);
function collectData() {
    /*input values follow below*/
const nameValue = document.getElementById("name").value;
const emailValue = document.getElementById("email").value;
const companyValue = document.getElementById("company").value;
const messageValue = document.getElementById("brief").value;
}
elForm.addEventListener("submit", collectData, false);
console.log(elForm);
console.log(formData)
