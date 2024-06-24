// -------------------- Image Filter Section -------------------- //

// Selecting all filter items and buttons
const allFilterItems = document.querySelectorAll('.filter-item');
const allFilterBtns = document.querySelectorAll('.filter-btn');

// When the page loads, add the 'active-btn' class to the second button
window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[1].classList.add('active-btn');
});

// For each filter button, add an event listener for click events
allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn);
    });
});

// Function to show filtered content
function showFilteredContent(btn){
    allFilterItems.forEach((item) => {
        if(item.classList.contains(btn.id)){
            resetActiveBtn();
            btn.classList.add('active-btn');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Function to reset the active button
function resetActiveBtn(){
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}
// -------------------------------------------------------------- //

// --------------------- Shopping Cart Section ------------------ //

// Check if the document is still loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Function that executes when the document is ready
function ready() {
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    window.addEventListener('storage', updateCartCount); // Listen for changes in localStorage
    updateCartCount(); // Update cart count when the page loads
}

// Function that executes when the add to cart button is clicked
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.querySelector('.shop-item-title').innerText;
    var price = shopItem.querySelector('.shop-item-price').innerText;
    var imageSrc = shopItem.querySelector('.shop-item-image').src;

    var newItem = {
        title: title,
        price: price,
        imageSrc: imageSrc
    };

    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var itemExists = cartItems.some(item => item.title === newItem.title);

    if (!itemExists) {
        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Item added to cart!');
        updateCartCount(); // Update cart count when a new item is added
    } else {
        alert('This item is already in the cart!');
    }
}

// Function to update the cart count
function updateCartCount() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = cartItems.length;

    var cartLink = document.querySelector('.navbar a[href="/shop-cart.html"]');
    if (cartItems.length > 0) {
        cartLink.classList.remove('disabled');
    } else {
        cartLink.classList.add('disabled');
    }
}

// Initialize cart count when the page loads
updateCartCount();
// -------------------------------------------------------------- //

// -------------------- FOR UP BUTTON -------------------------- //

// Event listener for the scroll to top button
document.querySelector('.up-icon').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// -------------------------------------------------------------- //

// --------------------- FOR SEARCH ---------------------------- //

// Function to filter products based on the search input
function filterProductCards() {
    var input, filter, cards, card, title, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    cards = document.getElementById("product-cards").getElementsByClassName("filter-item");

    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        title = card.getElementsByClassName("shop-item-title")[0];
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    }
}

// -------------------------------------------------------------- //

// --------------------- NOT FOUND ITEM ------------------------ //

// Adding an event listener for the search input field
document.getElementById("searchInput").addEventListener("keyup", filterProductCards);

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.navbar-search input[type="text"]');
    const notFoundMessage = document.getElementById('not-found');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        const productCards = document.querySelectorAll('.filter-item');

        let found = false;

        productCards.forEach(card => {
            const cardTitle = card.querySelector('.shop-item-title').textContent.toLowerCase();
            if (cardTitle.includes(searchTerm)) {
                card.style.display = '';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (!found) {
            notFoundMessage.style.display = 'block';
        } else {
            notFoundMessage.style.display = 'none';
        }
    });
});
// -------------------------------------------------------------- //

// --------------------- FOR LOGIN ----------------------------- //
document.addEventListener('DOMContentLoaded', function () {
    // If the user is logged in, start tracking time
    if (isUserLoggedIn()) {
        startTrackingTime();
        saveLastLogin();
    }

    // Populate profile data
    populateProfileData();
});

// Check if the user is logged in (example implementation)
function isUserLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return !!loggedInUser;
}

// Function to populate profile data
function populateProfileData() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    var profileFirstName = loggedInUser.firstName || "John"; // Example, fetch from your system
    var profileLastName = loggedInUser.lastName || "Doe";   // Example, fetch from your system
    var profileEmail = loggedInUser.email || "john.doe@example.com"; // Example, fetch from your system
    var profileGender = loggedInUser.gender || "Male";    // Example, fetch from your system
    var spendTime = localStorage.getItem('spendTime') || 0;
    var lastLogin = localStorage.getItem('lastLogin') || 'Never';

    document.getElementById('profileFirstName').innerText = profileFirstName;
    document.getElementById('profileLastName').innerText = profileLastName;
    document.getElementById('profileEmail').innerText = profileEmail;
    document.getElementById('profileGender').innerText = profileGender;
    document.getElementById('profileSpendTime').innerText = formatSpendTime(spendTime);
    document.getElementById('profileLastLogin').innerText = lastLogin;

    updateSpendTimeDisplay(); // Start updating the time spent on the page
}

// Format the time spent in a readable format
function formatSpendTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var seconds = seconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}

// Start tracking time
function startTrackingTime() {
    var startTime = Date.now();
    setInterval(function () {
        var spendTime = parseInt(localStorage.getItem('spendTime')) || 0;
        var currentTime = Date.now();
        var timeSpent = Math.floor((currentTime - startTime) / 1000);

        localStorage.setItem('spendTime', spendTime + timeSpent);
        startTime = currentTime;

        updateSpendTimeDisplay(); // Update the time display
    }, 1000);
}

// Function to update the time spent display
function updateSpendTimeDisplay() {
    var spendTime = localStorage.getItem('spendTime') || 0;
    document.getElementById('profileSpendTime').innerText = formatSpendTime(spendTime);
}

// Save the last login time upon login
function saveLastLogin() {
    var now = new Date();
    var formattedDate = now.getDate().toString().padStart(2, '0') + '.' + 
                        (now.getMonth() + 1).toString().padStart(2, '0') + '.' + 
                        now.getFullYear() + ' ' + 
                        now.getHours().toString().padStart(2, '0') + ':' + 
                        now.getMinutes().toString().padStart(2, '0') + ':' + 
                        now.getSeconds().toString().padStart(2, '0');

    localStorage.setItem('lastLogin', formattedDate);
}

// Example login function that calls saveLastLogin
function loginUser() {
    saveLastLogin();
    // Place your login logic here
    startTrackingTime();
}

// Example logout function that saves the time spent
function logoutUser() {
    var spendTime = parseInt(localStorage.getItem('spendTime')) || 0;
    localStorage.setItem('spendTime', spendTime);
}

// Check if the user is logged in
function isUserLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return !!loggedInUser;
}

// Example function to track time and continue tracking
function continueTrackingTime() {
    startTrackingTime();
}

//--------------------

// Function to show user profile
function showUserProfile() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    document.getElementById("user-name").textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    document.getElementById("user-profile").style.display = "block";
}

// Function to hide the login button and show the logout button
function hideLoginButton() {
    document.getElementById("loginRegisterBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("settingsBtn").style.display = "block";
}

// Function to log out the user
document.getElementById('logoutLink').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser'); // Remove logged in user from localStorage
    localStorage.removeItem('cartItems'); // Clear cart items
    window.location.href = "/index.html"; // Redirect to login page
});

// When the user is logged in, display their name on the right side
document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // User is logged in
        document.getElementById('user-name').textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
        document.getElementById('user-profile').style.display = 'block';
        document.getElementById('loginRegisterBtn').style.display = 'none';
        document.getElementById('settingsBtn').style.display = 'block';
    } else {
        // User is not logged in
        document.getElementById('user-profile').style.display = 'none';
        document.getElementById('loginRegisterBtn').style.display = 'block';
        document.getElementById('settingsBtn').style.display = 'none';
    }

    // Show and hide the settings menu
    document.getElementById('settings-button').addEventListener('click', function() {
        const settingsMenu = document.getElementById('settingsMenu');
        settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Show profile
    document.getElementById('profileLink').addEventListener('click', function() {
        document.getElementById('profileFirstName').textContent = loggedInUser.firstName;
        document.getElementById('profileLastName').textContent = loggedInUser.lastName;
        document.getElementById('profileEmail').textContent = loggedInUser.email;
        document.getElementById('profileGender').textContent = loggedInUser.gender;
        document.getElementById('profileSection').style.display = 'block';
        document.getElementById('product-cards').style.display = 'none';
        document.getElementById('category').style.display = 'none';
        document.getElementById('footer').style.display = 'none';
        document.getElementById('settingsMenu').style.display = 'none';
    });

    // Show change password modal
    document.getElementById('changePasswordLink').addEventListener('click', function() {
        const changePasswordModal = document.getElementById('changePasswordModal');
        changePasswordModal.style.display = 'block';
        document.body.classList.add('modal-open'); // Prevent scrolling
        document.getElementById('settingsMenu').style.display = 'none';
    });

    // Close change password modal
    document.getElementById('closeChangePasswordModal').addEventListener('click', function() {
        closeModal('changePasswordModal');
    });

    // Submit change password form
    document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const currentPassword = document.getElementById('currentPasswordChange').value;
        const newPassword = document.getElementById('newPasswordChange').value;
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (currentPassword === loggedInUser.password) {
            loggedInUser.password = newPassword;
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            localStorage.setItem(loggedInUser.email, JSON.stringify(loggedInUser));
            alert('Password changed successfully!');
            closeModal('changePasswordModal');
        } else {
            alert('Current password is incorrect.');
        }
    });

    // Show deactivate account modal
    document.getElementById('deactivateAccountLink').addEventListener('click', function() {
        const deactivateModal = document.getElementById('deactivateModal');
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        document.getElementById('deactivationEmail').value = loggedInUser.email; // Auto-fill email
        deactivateModal.style.display = 'block';
        document.body.classList.add('modal-open'); // Prevent scrolling
    });

    // Close deactivate account modal
    document.getElementById('closeDeactivateModal').addEventListener('click', function() {
        closeModal('deactivateModal');
    });

    document.getElementById('cancelDeactivationButton').addEventListener('click', function() {
        closeModal('deactivateModal');
    });

    // Submit deactivate account form
    document.getElementById('deactivateAccountForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const deactivationPassword = document.getElementById('deactivationPassword').value;
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (deactivationPassword === loggedInUser.password) {
            localStorage.removeItem(loggedInUser.email);
            localStorage.removeItem('loggedInUser');
            alert('Account successfully deleted.');
            closeModal('deactivateModal');
            window.location.href = "/index.html";
        } else {
            alert('Incorrect password.');
        }
    });

    // Function to close modal windows
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Allow scrolling
    }

    // Event listener for pressing Enter in deactivate account modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && document.getElementById('deactivateModal').style.display === 'block') {
            event.preventDefault();
            document.getElementById('deactivateAccountForm').dispatchEvent(new Event('submit'));
        }

        // Event listener for pressing Enter in change password modal
        if (event.key === 'Enter' && document.getElementById('changePasswordModal').style.display === 'block') {
            event.preventDefault();
            document.getElementById('changePasswordForm').dispatchEvent(new Event('submit'));
        }
    });

    // Event listener for showing/hiding password
    document.getElementById('showPasswordCheckbox').addEventListener('change', function() {
        const currentPasswordInput = document.getElementById('currentPasswordChange');
        const newPasswordInput = document.getElementById('newPasswordChange');
        if (this.checked) {
            currentPasswordInput.type = 'text'; // Show password
            newPasswordInput.type = 'text'; // Show password
        } else {
            currentPasswordInput.type = 'password'; // Hide password
            newPasswordInput.type = 'password'; // Hide password
        }
    });
});
// Open profile modal
document.getElementById('profileLink').addEventListener('click', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    document.getElementById('profileFirstName').textContent = loggedInUser.firstName;
    document.getElementById('profileLastName').textContent = loggedInUser.lastName;
    document.getElementById('profileEmail').textContent = loggedInUser.email;
    document.getElementById('profileGender').textContent = loggedInUser.gender;
    const profileModal = document.getElementById('profileModal');
    profileModal.style.display = 'block';
    document.body.classList.add('modal-open'); // Prevent scrolling
});

// Close profile modal
document.getElementById('closeProfileModal').addEventListener('click', function() {
    closeModal('profileModal');
});

// Function to close modal windows
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Allow scrolling
}

// Event listener for showing/hiding password
document.getElementById('showLoginPassword').addEventListener('change', function() {
    const passwordInput = document.getElementById('loginPassword');
    if (this.checked) {
        passwordInput.type = 'text'; // Show password
    } else {
        passwordInput.type = 'password'; // Hide password
    }
});

// Load subscribed email addresses from localStorage
let subscribedEmails = new Set(JSON.parse(localStorage.getItem('subscribedEmails')) || []);

// Function for subscribing
function subscribe(event) {
    event.preventDefault(); // Prevent default form submission
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();
    var messageDiv = document.getElementById('message');

    if (email) {
        if (subscribedEmails.has(email)) {
            messageDiv.innerText = `The email ${email} is already subscribed.`;
        } else {
            subscribedEmails.add(email);
            localStorage.setItem('subscribedEmails', JSON.stringify(Array.from(subscribedEmails)));
            messageDiv.innerText = `Thank you for subscribing! You'll now receive updates from Urban Vibe Store at ${email}.`;
        }
        emailInput.value = ''; // Clear the input field
        messageDiv.style.display = 'block';
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide the message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    } else {
        alert('Please enter a valid email address.');
    }
}

// Check if the user is already subscribed on both pages
function checkSubscriptionStatus() {
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();
    var messageDiv = document.getElementById('message');

    if (email && subscribedEmails.has(email)) {
        messageDiv.innerText = `The email ${email} is already subscribed.`;
        messageDiv.style.display = 'block';
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide the message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);

        return true;
    }
    return false;
}

// -------------------------------------------------------------- //
