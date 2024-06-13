document.addEventListener('DOMContentLoaded', function () {
    // Иницијализирај ја прикажувањето на количката, ажурирај го бројот на ставки во количката и провери ја состојбата на количката кога ќе се вчита страницата
    displayCartItems();
    updateCartCount();
    checkCartStatus(); // Провери ја состојбата на количката при вчитување на страницата
});

function displayCartItems() {
    // Преземи ги ставките од количката од localStorage или иницијализирај празна низа ако нема ниедна ставка
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];

    // Исчисти ги постојните ставки
    cartItemsContainer.innerHTML = '';

    // За секоја ставка во количката, создај ред и пополни го со информации за ставката
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

        // Додај слушатели на настани за копчето за отстранување и промената на количината
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    });

    // Ажурирај го вкупниот износ и провери ја состојбата на количката
    updateCartTotal();
    checkCartStatus(); // Провери ја состојбата на количката по прикажување на ставките
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var title = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText;
    buttonClicked.parentElement.parentElement.remove();

    // Преземи ги ставките од количката од localStorage и филтрирај ја за да ги отстраниш ставките кои се избришани
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.title !== title);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Ажурирај го вкупниот износ и бројот на ставки во количката
    updateCartTotal();
    updateCartCount(); // Ажурирај го бројот на ставки во количката кога ќе се отстрани ставка
    checkCartStatus(); // Провери ја состојбата на количката по отстранување на ставка
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1; // Врати ја количината на 1 ако вредноста е невалидна или помала од 1
    } else if (input.value > 20) {
        input.value = 20; // Ограничување на количината на максимум 20
    }
    updateCartTotal(); // Ажурирај го вкупниот износ
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    // Пресметај го вкупниот износ според цената и количината на секоја ставка
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('Price: ', ''));
        var quantity = quantityElement.value;
        total += (price * quantity);
    }

    total = Math.round(total * 100) / 100; // Заокружи го вкупниот износ на две децимали
    document.getElementsByClassName('cart-total-price')[0].innerText = total + '€';

    checkCartStatus(); // Провери ја состојбата на количката по ажурирање на вкупниот износ
}

function updateCartCount() {
    // Преземи ги ставките од количката од localStorage и ажурирај го бројот на ставки во количката
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.getElementById('cart-count').innerText = cartItems.length;
}

function checkCartStatus() {
    // Преземи ги ставките од количката од localStorage и проверувај ја состојбата на количката
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartContent = document.getElementById('cart-content');
    var shippingForm = document.getElementById('shippingForm');
    var total = parseFloat(document.getElementsByClassName('cart-total-price')[0].innerText.replace('Price: ', ''));

    if (total === 0) {
        // Пренасочи на почетната страница ако вкупниот износ е 0
        window.location.href = '/HomePage/index.html';
    } else {
        cartContent.style.display = 'block'; // Прикажи ја содржината на количката
        shippingForm.style.display = 'block'; // Прикажи ја формата за испорака
    }
}

// Додај слушател на настани за поднесување на формата за испорака
document.getElementById('shippingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Спречи го стандардното однесување на формата

    var fullName = document.getElementById('fullName').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var zip = document.getElementById('zip').value;
    var country = document.getElementById('country').value;

    if (isNaN(zip)) {
        alert('Please enter a valid number for the ZIP code.');
        return;
    }

    // Прикажи потврда со информациите за испорака
    alert(`Shipping information submitted successfully!
    Full Name: ${fullName}
    Address: ${address}
    City: ${city}
    ZIP Code: ${zip}
    Country: ${country}`);

    document.getElementById('purchaseBtn').disabled = false; // Овозможи го копчето за купување
});

// Додај слушател на настани за копчето за купување
document.getElementById('purchaseBtn').addEventListener('click', function () {
    purchaseClicked();
});

function purchaseClicked() {
    // Преземи ги информациите за испорака
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

    localStorage.removeItem('cartItems'); // Отстрани ги ставките од количката од localStorage
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    while (cartItemsContainer.hasChildNodes()) {
        cartItemsContainer.removeChild(cartItemsContainer.firstChild); // Исчисти ги сите ставки од количката
    }
    updateCartTotal(); // Ажурирај го вкупниот износ
    updateCartCount(); // Ажурирај го бројот на ставки во количката по купувањето
    checkCartStatus(); // Провери ја состојбата на количката по купувањето
    document.getElementById('shippingForm').reset(); // Ресетирај ја формата за испорака
    document.getElementById('purchaseBtn').disabled = true; // Оневозможи го копчето за купување
}

// Функција за отстранување на сите ставки од количката и пренасочување на почетната страница
document.getElementById('removeAllBtn').addEventListener('click', function () {
    localStorage.removeItem('cartItems'); // Отстрани ги сите ставки од localStorage
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    while (cartItemsContainer.hasChildNodes()) {
        cartItemsContainer.removeChild(cartItemsContainer.firstChild); // Исчисти ги сите ставки од количката
    }
    updateCartTotal(); // Ажурирај го вкупниот износ
    updateCartCount(); // Ажурирај го бројот на ставки во количката по отстранувањето
    checkCartStatus(); // Провери ја состојбата на количката по отстранувањето
    window.location.href = '/HomePage/index.html'; // Пренасочи на почетната страница
});

// Ажурирај го бројот на ставки во количката кога ќе се вчита страницата
document.addEventListener('DOMContentLoaded', updateCartCount);
