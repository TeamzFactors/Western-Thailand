// var resendAttempts = 0;
// var maxResendAttempts = 5; // Set the maximum number of resend attempts

function validateForm() {
    // Get the verification code input element
    var verificationCodeInput = document.getElementById('verificationCode');
    var emailInput = document.getElementById('email'); // Assuming you have an email input field
  
    // Get the value of the verification code and email
    var verificationCode = verificationCodeInput.value.trim();
    var email = emailInput.value.trim();
  
    // Check if the verification code is not empty
    if (verificationCode === "") {
      // Use SweetAlert2 for a more visually appealing alert
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: 'Please enter the verification code.',
      });
      return;
    }
  
    // Additional validation criteria for the verification code
    var validCodeRegex = /^[a-zA-Z0-9]+$/; // Alphanumeric characters only
  
    if (!validCodeRegex.test(verificationCode) || verificationCode.length !== 6) {
      // Use SweetAlert2 for an error message if the code doesn't match the pattern or length
      Swal.fire({
        icon: 'error',
        title: 'Invalid Verification Code!',
        text: 'Please enter a valid alphanumeric verification code with exactly 6 characters.',
      });
      return;
    }
  
    setTimeout(function () {
        document.getElementById('verificationForm').submit();
    }, 1000);
}
