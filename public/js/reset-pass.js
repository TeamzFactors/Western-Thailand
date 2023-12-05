function showPassword(inputId, labelId) {
    var passwordInput = document.getElementById(inputId);
    var passwordLabel = document.getElementById(labelId);
    passwordLabel.textContent = passwordInput.value;
  }

  function validateForm() {
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Check if newPassword and confirmPassword are empty
    if (newPassword.trim() === '' || confirmPassword.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Empty Fields!',
        text: 'Please fill in both New Password and Confirm Password fields.',
      });
      return false;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Something Went Wrong!',
        text: 'New Password and Confirm Password do not match.',
      });
      return false;
    }

    // Check for minimum length of 6 characters
    if (newPassword.length < 6) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Password!',
          text: 'Password must be at least 6 characters.',
        });
        return false;
      }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(newPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password!',
        text: 'Password must contain at least one lowercase letter.',
      });
      return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(newPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password!',
        text: 'Password must contain at least one uppercase letter.',
      });
      return false;
    }

    // Check for at least one digit
    if (!/\d/.test(newPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password!',
        text: 'Password must contain at least one digit.',
      });
      return false;
    }

    // Show success alert using SweetAlert2
    Swal.fire({
        position: "center",
        icon: "success",
        title: "New Password has been created.",
        showConfirmButton: false,
    });

    // Delay the redirection to the login page
    setTimeout(() => {
        // Redirect to the login page
        window.location.href = '/login';
    }, 1000);
  }
