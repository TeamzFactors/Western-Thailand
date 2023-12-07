document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
      
      if (!validateUsername()) {
          return;
      }
      if (!validateEmail()) {
          event.preventDefault();
          return;
      }
      if (!validatePassword()) {
          event.preventDefault();
          return;
      }
      if (!validateConfirmPassword()) {
          event.preventDefault();
          return;
      }
      if (!validatePhoneNumber()) {
          event.preventDefault();
          return;
      }
      if (!validateBirthDate()) {
          event.preventDefault();
          return;
      }
      if (!validateTerms()) {
          event.preventDefault();
          return;
      }

      setTimeout(() => {
        form.submit();
      }, 1000);
    });

  function validateUsername() {
    const usernameInput = document.getElementById("input_username");
    const username = usernameInput.value.trim();
  
    if (username === "") {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please enter your username.",
      });
      return false;
    }
  
    // Check for spaces in the username
    if (username.includes(" ")) {
      Swal.fire({
        icon: "error",
        title: "Invalid Username!",
        text: "Username cannot contain spaces.",
      });
      return false;
    }
  
    // Check for minimum and maximum length
    const minLength = 3;
    const maxLength = 12;
  
    if (username.length < minLength || username.length > maxLength) {
      Swal.fire({
        icon: "error",
        title: "Invalid Username Length!",
        text: `Username must be between ${minLength} and ${maxLength} characters.`,
      });
      return false;
    }
  
    // Check for at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(username);
  
    if (!hasLetter) {
      Swal.fire({
        icon: "error",
        title: "Invalid Characters!",
        text: "Username must contain at least one letter.",
      });
      return false;
    }
  
    // Check for allowed characters (alphanumeric and underscores)
    const allowedCharactersRegex = /^[a-zA-Z0-9_]+$/;
  
    if (!allowedCharactersRegex.test(username)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Characters!",
        text: "Username can only contain letters, numbers, and underscores.",
      });
      return false;
    }
  
    // If all checks pass, the username is valid
    return true;
  }  
  
    function validateEmail() {
      const emailInput = document.getElementById("input_email");
      const email = emailInput.value.trim().toLowerCase();
  
      const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email === "") {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please enter your email address.",
      });
          return false;
      }
  
      if (!emailRegex.test(email)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Email Address!",
          text: "Please enter a valid email address.",
        });
        return false;
      }
  
      const domain = email.split("@")[1];
      if (!allowedDomains.includes(domain)) {
        Swal.fire({
          icon: "error",
          title: "Invalid email domain!",
          text: "Please enter an allowed email address domain (Gmail, Hotmail, Yahoo and Outlook).",
      });
          return false;
      }
  
      return true;
    }
    
    function validatePassword() {
      const passwordInput = document.getElementById("input-pass");
      const password = passwordInput.value;
    
      if (password === "") {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please enter your password.",
        });
        return false;
      }
    
      // Check for minimum length
      if (password.length < 6) {
        Swal.fire({
          icon: "error",
          title: "Weak Password!",
          text: "Password must be at least 6 characters.",
        });
        return false;
      }
    
      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        Swal.fire({
          icon: "error",
          title: "Weak Password!",
          text: "Password must contain at least one uppercase letter.",
        });
        return false;
      }
    
      // Check for at least one lowercase letter
      if (!/[a-z]/.test(password)) {
        Swal.fire({
          icon: "error",
          title: "Weak Password!",
          text: "Password must contain at least one lowercase letter.",
        });
        return false;
      }
    
      // Check for at least one digit
      if (!/\d/.test(password)) {
        Swal.fire({
          icon: "error",
          title: "Weak Password!",
          text: "Password must contain at least one digit.",
        });
        return false;
      }
    
      // If all conditions pass, the password is strong
      return true;
    }
    
    function validateConfirmPassword() {
      const passwordInput = document.getElementById("input-pass");
      const confirmPasswordInput = document.getElementById("input-confirm-pass");
  
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (confirmPassword === "") {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please enter your confirm password.",
        });
        return false;
      }
  
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Password and Comfirm Password is not match.",
        });
        return false;
      }
  
      return true;
    }
  
    function validatePhoneNumber() {
      const phoneNumberInput = document.getElementById("input_phoneNumber");
      const phoneNumber = phoneNumberInput.value.trim();
    
      if (phoneNumber === "") {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please enter your phone number.",
        });
        return false;
      }
    
      // Regular expression for exactly 10 digits (local Thai number) or an international number, and no letters
      const phoneNumberRegex = /^(0\d{1,2}-?\d{3}-?\d{4}|(\+66|0)-?(\d{1,2})-?(\d{3})-?(\d{4}))$/;
    
      // Test the input against the regular expression
      if (phoneNumberRegex.test(phoneNumber) && /^\d+$/.test(phoneNumber.replace(/[-+]/g, ''))) {
        // Valid phone number
        return true;
      } else {
        // Invalid phone number
        Swal.fire({
          icon: "error",
          title: "Invalid Phone Number!",
          text: "Please enter a valid Thai phone number without any letters (use the format 0XX-XXX-XXXX).",
        });
        return false;
      }
    }    
  
    function validateBirthDate() {
      const birthDateInput = document.getElementById("input_birthDate");
      const birthDate = birthDateInput.value;
    
      // Check if the input is not empty
      if (birthDate === "") {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please enter your birth date.",
        });
        return false;
      }
    
      // Validate date format using a regular expression (YYYY-MM-DD)
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    
      if (!dateFormatRegex.test(birthDate)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Date Format!",
          text: "Please enter a valid date in the format YYYY-MM-DD.",
        });
        return false;
      }
    
      // Validate that the person is at least 7 years old
      const currentDate = new Date();
      const inputDate = new Date(birthDate);
      const minAge = 7;
    
      if (currentDate.getFullYear() - inputDate.getFullYear() < minAge) {
        Swal.fire({
          icon: "error",
          title: "Invalid Age!",
          text: "You must be at least 7 years old.",
        });
        return false;
      }
    
      // If all checks pass, the birth date is valid
      return true;
    }    
  
    function validateTerms() {
      const termsCheckbox = document.getElementById("input-check");
    
      if (!termsCheckbox.checked) {
        Swal.fire({
          icon: "error",
          title: "Terms and Conditions!",
          text: "Please accept the terms and conditions.",
        });
        return false;
      }
    
      return true;
    }
  });
  