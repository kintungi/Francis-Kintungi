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
    const selected = target.textContent;
   if (target.className === "list-item"){ inquiry.textContent = selected;
    inquiryLine.classList.remove("warn");
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
let isFormValid = false; //A flag fo validating the form
const date = new Date();
const forms = [];
const formStatus  = document.getElementById("status"); //DOM element to display status of the form after being sent
const input = elForm.elements; //binding the form element collection
const regEx = /[^@]+@[^@]+/; //regular expression for email inputs
console.log(regEx.test(input[1].value));
let typed = {};
let validEmail = false;

(//Validating Email input
    function(){
        let elMessage = input[1].nextSibling.nextSibling;//targeting the error message span
        let inputBorder = input[1].nextSibling.nextSibling.nextSibling; //targeting the bottom border of the input in action
        let elPlaceholder = input[1].nextSibling;//binding the placeholder text
        input[1].addEventListener("input", () => { 
            elPlaceholder.classList.add("float");
        }, false)
        input[1].addEventListener("blur", () => {
            if (input[1].value !== "") {//If email value is not empty, check if a valid email was entered, if not set an error message
                valid = regEx.test(input[1].value);
                if (!valid) {//set error message and highlight input
                    elMessage.textContent = "*Enter a valid email address";
                    inputBorder.classList.add("warn");
                    validEmail = false;
                }else if (valid){//clear error message and remove highlight
                    elMessage.textContent = "";
                    inputBorder.classList.remove("warn");
                    validEmail = true;
                }
            }//end if statement
            if (input[1].value === ""){
                inputBorder.classList.remove("warn");
                let elPlaceholder = input[1].nextSibling;
                elPlaceholder.classList.remove("float");
                elMessage.textContent = "";
            };})
    }
)();//End of validating email input
function sendData(e) {
    e.preventDefault(); //prevent reload
    // validateRequired();
    (function validateRequired() {
        let valid = true;
        let l = (elForm.elements.length - 1); //excluding the submit buttton
        for (let i = 0; i < l; i++) {
            let elMessage = input[i].nextSibling.nextSibling;//targeting the error message span
            let inputBorder = input[i].nextSibling.nextSibling.nextSibling; //targeting the bottom border of the input in action
            if ((input[i].required === true) && (input[i].value === "")){
                console.log("hello required");
                    (function() { //setErrorMessage()
                        elMessage.textContent = "*This field is required";
                        inputBorder.classList.add("warn")
                        console.log(elMessage);
                        console.log(inputBorder);
                    })();
                }
            input[i].addEventListener("input", () => {
                if (input[i].value !== "") {
                    elMessage.textContent = "";
                    inputBorder.classList.remove("warn")
                }
            });
            input[i].addEventListener("blur", () => {
                if (input[i].value === "") {
                    elMessage.textContent = "*This field is required";
                    inputBorder.classList.add("warn");
                }
            });
            input[1].addEventListener("blur", () => {
                let elMessage = input[1].nextSibling.nextSibling;//targeting the error message span
                let inputBorder = input[1].nextSibling.nextSibling.nextSibling; //targeting the bottom border of the input in action
                if (input[1].value !== "") {//If email value is not empty, check if a valid email was entered, if not set an error message
                    valid = regEx.test(input[1].value);
                    if (!valid) {//set error message and highlight input
                        elMessage.textContent = "*Enter a valid email address";
                        inputBorder.classList.add("warn");
                        validEmail = false;
                    }else {//clear error message and remove highlight
                        elMessage.textContent = "";
                        inputBorder.classList.remove("warn");
                        validEmail = true;
                    }
                }
                if (input[1].value === ""){
                    inputBorder.classList.remove("warn");
                    let elPlaceholder = input[1].nextSibling;
                    elPlaceholder.classList.remove("float");
                    elMessage.textContent = "";
                };})
                if ((input[i].value !== "") && (inquiry.textContent !== "Select inquiry") && (validEmail === true)) {
                    isFormValid = true;
                }else if (inquiry.textContent === "Select inquiry"){
                    inquiryLine.classList.add("warn");
                } 
        };//end of loop
      
    })();//end of validateRequired()
if (isFormValid === true){
let formData = { //object to store form data
    inquiry: inquiry.textContent,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    company: document.getElementById("company").value,
    messsage: document.getElementById("brief").value  
};//formData object
/*preparing the ajax request object*/
let xhr = new XMLHttpRequest();
xhr.open("POST", "https://formspree.io/mbjzzwvl");
xhr.setRequestHeader("Accept", "application/json"); //validating CORS
xhr.send(JSON.stringify(formData));
xhr.onload = function(){
            if (xhr.status === 200) {
                elForm.reset();
                formStatus.textContent = "Thank you, submission successful! ";
            } else {
                console.log("error");
                console.log(xhr.status);
                formStatus.textContent = "Oops! there was a problem";
            };
        };

}
 
};//sendData closing bracket
// function submitForm() {
//     validateRequired();
//     if ((formIsValid === true) && (inquiry.textContent !== "Select inquiry")) {
//         sendData();
//     }
// }
// console.log(formData);
document.addEventListener("DOMContentLoaded", function() {
    elForm.reset();
    elForm.addEventListener("submit", sendData, false);
}, false);
window.addEventListener("scroll", () => {
    let logotype = document.getElementById("logo");
    let hamburger = document.getElementById("menu-stroke")
    let top = window.pageYOffset;
    // console.log(top);
    if (top >= 540) {
        logotype.classList.add("white");
        hamburger.classList.add("white");
    } else {
        hamburger.classList.remove("white");
        logotype.classList.remove("white");
    }

},false);
briefInput.addEventListener("input",() => {
    briefInput.style.height = document.getElementById("brief").scrollHeight + "px"
},false)
