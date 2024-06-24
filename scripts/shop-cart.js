document.addEventListener('DOMContentLoaded', function () {
    // Initialize the cart display, update the cart item count, and check the cart status when the page loads
    displayCartItems();
    updateCartCount();
    checkCartStatus(); // Check the cart status on page load
});

function displayCartItems() {
    // Get cart items from localStorage or initialize an empty array if there are no items
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];

    // Clear existing items
    cartItemsContainer.innerHTML = '';

    // For each item in the cart, create a row and populate it with item information
    cartItems.forEach(item => {
        var cartRow = document.createElement('tr');
        cartRow.classList.add('cart-row');
        var cartRowContents = `
            <td class="cart-item cart-column">
                <img class="cart-item-image" src="${item.imageSrc}" width="50" height="50">
                <span class="cart-item-title">${item.title}</span>
            </td>
            <td class="cart-price cart-column">${item.price}</td>
            <td class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1" min="1" max="20" style="width: 50px">
                <button class="btn btn-danger" type="button">Remove</button>
            </td>
        `;
        cartRow.innerHTML = cartRowContents;
        cartItemsContainer.append(cartRow);

        // Add event listeners for the remove button and quantity change
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    });

    // Update the total amount and check the cart status
    updateCartTotal();
    checkCartStatus(); // Check the cart status after displaying items
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var title = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText;
    buttonClicked.parentElement.parentElement.remove();

    // Get cart items from localStorage and filter out the removed items
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.title !== title);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the total amount and the cart item count
    updateCartTotal();
    updateCartCount(); // Update the cart item count after removing an item
    checkCartStatus(); // Check the cart status after removing an item
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1; // Reset quantity to 1 if the value is invalid or less than 1
    } else if (input.value > 20) {
        input.value = 20; // Limit the quantity to a maximum of 20
    }
    updateCartTotal(); // Update the total amount
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    // Calculate the total amount based on the price and quantity of each item
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('Price: ', ''));
        var quantity = quantityElement.value;
        total += (price * quantity);
    }

    total = Math.round(total * 100) / 100; // Round the total amount to two decimal places
    document.getElementsByClassName('cart-total-price')[0].innerText = total + '€';

    checkCartStatus(); // Check the cart status after updating the total amount
}

function updateCartCount() {
    // Get cart items from localStorage and update the cart item count
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.getElementById('cart-count').innerText = cartItems.length;
}

function checkCartStatus() {
    // Get cart items from localStorage and check the cart status
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartContent = document.getElementById('cart-content');
    var shippingForm = document.getElementById('shippingForm');
    var total = parseFloat(document.getElementsByClassName('cart-total-price')[0].innerText.replace('Price: ', ''));

    if (total === 0) {
        // Redirect to the homepage if the total amount is 0
        window.location.href = 'https://blagojce-7.github.io/dropshipping/index.html';
    } else {
        cartContent.style.display = 'block'; // Display the cart content
        shippingForm.style.display = 'block'; // Display the shipping form
    }
}

// Add event listener for submitting the shipping form
document.getElementById('shippingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    var fullName = document.getElementById('fullName').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var zip = document.getElementById('zip').value;
    var country = document.getElementById('country').value;

    if (isNaN(zip)) {
        alert('Please enter a valid number for the ZIP code.');
        return;
    }

    // Display a confirmation message with the shipping information
    alert(`Shipping information submitted successfully!
    Full Name: ${fullName}
    Address: ${address}
    City: ${city}
    ZIP Code: ${zip}
    Country: ${country}`);

    document.getElementById('purchaseBtn').disabled = false; // Enable the purchase button
});

// Add event listener for the purchase button
document.getElementById('purchaseBtn').addEventListener('click', function () {
    purchaseClicked();
});

function purchaseClicked() {
    // Get the shipping information
    var fullName = document.getElementById('fullName').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var zip = document.getElementById('zip').value;
    var country = document.getElementById('country').value;

    alert('Thank you for your purchase! Your order has been successfully placed and your package will be shipped to the following address:\n' +
        `Full Name: ${fullName}\n` +
        `Address: ${address}\n` +
        `City: ${city}\n` +
        `ZIP Code: ${zip}\n` +
        `Country: ${country}`);

    localStorage.removeItem('cartItems'); // Remove the cart items from localStorage
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    while (cartItemsContainer.hasChildNodes()) {
        cartItemsContainer.removeChild(cartItemsContainer.firstChild); // Clear all items from the cart
    }
    updateCartTotal(); // Update the total amount
    updateCartCount(); // Update the cart item count after purchase
    checkCartStatus(); // Check the cart status after purchase
    document.getElementById('shippingForm').reset(); // Reset the shipping form
    document.getElementById('purchaseBtn').disabled = true; // Disable the purchase button
}

// Function to remove all items from the cart and redirect to the homepage
document.getElementById('removeAllBtn').addEventListener('click', function () {
    localStorage.removeItem('cartItems'); // Remove all items from localStorage
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    while (cartItemsContainer.hasChildNodes()) {
        cartItemsContainer.removeChild(cartItemsContainer.firstChild); // Clear all items from the cart
    }
    updateCartTotal(); // Update the total amount
    updateCartCount(); // Update the cart item count after removal
    checkCartStatus(); // Check the cart status after removal
    window.location.href = 'https://blagojce-7.github.io/dropshipping/index.html'; // Redirect to the homepage
});

// Update the cart item count when the page loads
document.addEventListener('DOMContentLoaded', updateCartCount);
