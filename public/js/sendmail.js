// ทำให้ form มี animation และทำการ reset animation เมื่อกดปุ่ม reset
const inputs = document.querySelectorAll(".input");
const resetButton = document.querySelector(".btn2");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

function resetForm() {
    inputs.forEach((input) => {
        let parent = input.parentNode;
        parent.classList.remove("focus");
    });
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});
resetButton.addEventListener("click", resetForm);
        
// ระบบการส่ง email ในรูปแบบ smtp.js
function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var mess = document.getElementById("message").value;
    var sj = document.getElementById("subject").value;
                    
// Check form ว่าได้กรอกข้อความครบหรือยัง ถ้ายังจะขึ้นเตือนว่าต้องกรอกให้ครบก่อนถึงจะลงแบบฟอร์มได้
if (name === '' || email === '' || phone === '' || sj === '' || mess === '') {
    Swal.fire("Please fill out all of the fields!");
    return;
}

// Validation for name that regular expression to allow only letters
var nameRegex = /^[a-zA-Zก-๏\s]+$/;
    if (!name.match(nameRegex)) {
        Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please enter a valid name without number and without special character.",
    });
    return;
}

// const isGmail = email.match(/@gmail\.com$/);
// if (!isGmail) {
//   alert('Please enter a Gmail email address!');
//   return;
// }

// Validation for email format (basic validation)
const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
const domainMatch = email.match(/@(.+)$/);

// Check if the domain is extracted successfully and is in the allowed domains list
if (!domainMatch || allowedDomains.indexOf(domainMatch[1]) === -1) {
    Swal.fire({
    icon: "error",
    title: "Something went wrong!",
    text: "Please enter a valid email from Gmail, Hotmail, Yahoo, or Outlook.",
    });
    return;
}

// Validation for phone number format (basic validation for 10-digit phone numbers)
var phoneRegex = /^(02|03|04|05|06|07|08|09)[0-9]{8}$/;
    if (!phone.match(phoneRegex)) {
        Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Invalid phone number. Please enter a valid Thai phone number (e.g. 0812345678).",
    });
    return;
}
            
// If all validations pass, proceed to send the email
sendEmail(name, email, phone, sj, mess);
}
            
function sendEmail(name, email, phone, sj, mess) {
    var body = "Name : " + name + "<br> Email : " + email + "<br> Phone Number : " + phone + "<br><br> Message : " + mess;
    console.log(body);
            
    Email.send({
    SecureToken: "82a07828-0d65-439a-b750-4393450b402d",
    To: 'WesternThailand.at@gmail.com',
    From: "WesternThailand.at@gmail.com",
    Subject: sj,
    Body: body
    }).then(
    function (message) {
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Thank You for your submit.",
        showConfirmButton: false,
    });
                        
    // Refresh the page after sending the email
    setTimeout(() => {
        location.reload(true);
        }, 1000);
    });
}
                  