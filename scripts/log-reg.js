// Function to capitalize the first letter
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Function to validate text fields to contain only letters
function validateNameInput(event) {
    const input = event.target;
    const value = input.value;

    // Remove all unwanted characters
    const sanitizedValue = value.replace(/[^a-zA-Z]/g, '');
    input.value = capitalize(sanitizedValue);
}

// Adding event listeners for validation of first and last name fields
document.getElementById('signUpFirstName').addEventListener('input', validateNameInput);
document.getElementById('signUpLastName').addEventListener('input', validateNameInput);

// Get the buttons and container by their IDs
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Event listener for the sign-up button to add the "right-panel-active" class to the container
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

// Event listener for the sign-in button to remove the "right-panel-active" class from the container
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Submit the sign-up form
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const signUpType = document.getElementById('signUpType').value;
    const firstName = capitalize(document.getElementById('signUpFirstName').value);
    const lastName = capitalize(document.getElementById('signUpLastName').value);
    const email = document.getElementById('signUpEmail').value;
    const gender = document.getElementById('signUpGender').value;
    const password = document.getElementById('signUpPassword').value;

    // Check if the email already exists
    if (localStorage.getItem(email)) {
        alert('A profile with this email already exists.');
        return;
    }

    // Check if the password is at least 5 characters long
    if (password.length < 5) {
        alert('Password must be at least 5 characters long.');
        return;
    }

    // Check if the first and last name contain only letters
    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
        alert('First Name and Last Name can only contain letters.');
        return;
    }

    const user = {
        signUpType,
        firstName,
        lastName,
        gender,
        email,
        password
    };

    localStorage.setItem(email, JSON.stringify(user)); // Save user data in localStorage
    alert('Profile created successfully!');
    document.getElementById('signUpForm').reset(); // Reset the sign-up form
});

// Submit the sign-in form
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    const user = JSON.parse(localStorage.getItem(email));

    // Check user data
    if (user) {
        if (user.signUpType === 'primary' && user.password === password) {
            localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save the logged-in user in localStorage
            alert('Login successful!');
            // Redirect to the home page with first and last name as URL parameters
            window.location.href = `https://blagojce-7.github.io/dropshipping/index.html?firstName=${user.firstName}&lastName=${user.lastName}`;
        } else if (user.signUpType !== 'primary' && user.password === password) {
            alert(`Please use ${user.signUpType} to log in.`);
        } else {
            alert('Invalid email or password. Please try again.');
        }
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

// Functionality for forgotten password
document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.sign-in-container').style.display = 'none';
    document.querySelector('.sign-up-container').style.display = 'none';
    document.getElementById('forgotPasswordContainer').style.display = 'flex';
    document.querySelector('.overlay-container').style.display = 'none'; // Hide the right overlay
    document.body.classList.add('modal-open'); // Prevent scrolling
});

document.getElementById('backToLoginButton').addEventListener('click', function(event) {
    document.getElementById('forgotPasswordContainer').style.display = 'none';
    document.querySelector('.sign-in-container').style.display = 'block';
    document.querySelector('.overlay-container').style.display = 'block';
    document.querySelector('.sign-up-container').style.display = 'block';
    document.body.classList.remove('modal-open'); // Enable scrolling
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('forgotPasswordEmail').value;
    const user = JSON.parse(localStorage.getItem(email));

    // Check if the user exists
    if (user) {
        const newPassword = Math.random().toString(36).slice(-8); // Generate a random new password of 8 characters
        user.password = newPassword;
        localStorage.setItem(email, JSON.stringify(user)); // Update the user in localStorage
        alert(`Your new password is: ${newPassword}`);
        // Hide the forgotten password form
        document.getElementById('forgotPasswordContainer').style.display = 'none';
        // Show the sign-in form and overlay
        document.querySelector('.sign-in-container').style.display = 'block';
        document.querySelector('.overlay-container').style.display = 'block';
        document.querySelector('.sign-up-container').style.display = 'block';
        document.body.classList.remove('modal-open'); // Enable scrolling
    } else {
        alert('No profile with this email.');
    }
});
// Social login and registration
function simulateSocialLogin(provider) {
    const modal = document.getElementById("loginModal");
    const closeButton = document.querySelector(".close");
    const cancelButton = document.getElementById("modalCancel");
    const submitButton = document.getElementById("modalSubmit");
    const providerName = document.getElementById("providerName");
    const providerLogo = document.getElementById("providerLogo");

    // Set the logo and text for social login
    switch(provider) {
        case 'Facebook':
            providerLogo.src = "https://blagojce-7.github.io/dropshipping/images/facebook.webp";
            break;
        case 'Google':
            providerLogo.src = "https://blagojce-7.github.io/dropshipping/images/google.png";
            break;
        case 'LinkedIn':
            providerLogo.src = "https://blagojce-7.github.io/dropshipping/images/linked.webp";
            break;
    }
    providerLogo.alt = provider + " Logo";
    providerName.innerHTML = `<img id="providerLogo" src="${providerLogo.src}" alt="${providerLogo.alt}"> Login with ${provider}`;

    // Show the modal window
    modal.style.display = "block";

    // Function to close the modal window
    const closeModal = function() {
        modal.style.display = "none";
        resetEventListeners();
    };

    // When the user clicks on the X button, close the modal window
    closeButton.onclick = closeModal;

    // When the user clicks on the Cancel button, close the modal window
    cancelButton.onclick = closeModal;

    // Function to submit the form
    const login = function() {
        const email = document.getElementById("modalEmail").value;
        const password = document.getElementById("modalPassword").value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        const user = JSON.parse(localStorage.getItem(email));

        // Check if the user exists
        if (user && user.signUpType === provider.toLowerCase() && user.password === password) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            alert(`Successful login with ${provider}!`);
            window.location.href = 'https://blagojce-7.github.io/dropshipping/index.html';
        } else {
            alert(`No profile associated with this ${provider} email or password. Please register.`);
        }

        // Close the modal window
        closeModal();
    };

    // When the user clicks on the Submit button
    submitButton.onclick = login;

    // When the user presses Enter
    const keydownHandler = function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            login();
        }
    };
    modal.addEventListener('keydown', keydownHandler);

    // Function to reset the event listeners
    function resetEventListeners() {
        closeButton.onclick = null;
        cancelButton.onclick = null;
        submitButton.onclick = null;
        modal.removeEventListener('keydown', keydownHandler);
    }
}

// Event listeners for social login and registration
document.getElementById('facebookSignIn').addEventListener('click', function(event) {
    event.preventDefault();
    simulateSocialLogin('Facebook');
});

document.getElementById('googleSignIn').addEventListener('click', function(event) {
    event.preventDefault();
    simulateSocialLogin('Google');
});

document.getElementById('linkedinSignIn').addEventListener('click', function(event) {
    event.preventDefault();
    simulateSocialLogin('LinkedIn');
});

// To check for accounts in local storage
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    try {
        let user = JSON.parse(value);
        if (user && user.email) { // Add additional checks if needed
            console.log(`User Profile - Email: ${user.email}, First Name: ${user.firstName}, Last Name: ${user.lastName}, Gender: ${user.gender}`);
        }
    } catch (e) {
        // Some keys may not be user profiles, so JSON errors can be ignored
    }
}
console.log(localStorage);

// To clear local storage - all data
// localStorage.clear();
