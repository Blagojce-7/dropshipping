// -------------------- Image Filter Section -------------------- //

// Селектирање на сите филтер елементи и копчиња
const allFilterItems = document.querySelectorAll('.filter-item');
const allFilterBtns = document.querySelectorAll('.filter-btn');

// При вчитување на страната, додаваме класа 'active-btn' на второто копче
window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[1].classList.add('active-btn');
});

// За секое копче за филтер, додаваме слушател на настани за клик
allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn);
    });
});

// Функција за прикажување на филтрирана содржина
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

// Функција за ресетирање на активното копче
function resetActiveBtn(){
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}
// -------------------------------------------------------------- //

// --------------------- Shopping Cart Section ------------------ //

// Проверка дали документот е во состојба на вчитување
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Функција која се извршува кога документот е подготвен
function ready() {
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    window.addEventListener('storage', updateCartCount); // Слушање на промени во localStorage
    updateCartCount(); // Ажурирање на бројот на кошничката при вчитување на страната
}

// Функција која се извршува при кликање на копчето за додавање во кошничка
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
        updateCartCount(); // Ажурирање на бројот на кошничката кога ќе се додаде нов предмет
    } else {
        alert('This item is already in the cart!');
    }
}

// Функција за ажурирање на бројот на кошничката
function updateCartCount() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = cartItems.length;

    var cartLink = document.querySelector('.navbar a[href="/Shoping-cart/shop-cart.html"]');
    if (cartItems.length > 0) {
        cartLink.classList.remove('disabled');
    } else {
        cartLink.classList.add('disabled');
    }
}

// Инициализирање на бројот на кошничката при вчитување на страната
updateCartCount();



// -------------------------------------------------------------- //

// -------------------- FOR UP BUTTON -------------------------- //

// Слушател на настани за копчето за враќање на врвот
document.querySelector('.up-icon').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// -------------------------------------------------------------- //

// --------------------- FOR SEARCH ---------------------------- //

// Функција за филтрирање на продуктите базирано на внесениот текст за пребарување
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

// Додавање на слушател на настани за полето за пребарување
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
    // Ако е најавен корисник, почни да го следиш времето
    if (isUserLoggedIn()) {
        startTrackingTime();
        saveLastLogin();
    }

    // Пополни ги податоците на профилот
    populateProfileData();
});

// Проверка дали корисникот е најавен (пример имплементација)
function isUserLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return !!loggedInUser;
}

// Функција за пополнување на профил податоците
function populateProfileData() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    var profileFirstName = loggedInUser.firstName || "John"; // Пример, преземете од вашиот систем
    var profileLastName = loggedInUser.lastName || "Doe";   // Пример, преземете од вашиот систем
    var profileEmail = loggedInUser.email || "john.doe@example.com"; // Пример, преземете од вашиот систем
    var profileGender = loggedInUser.gender || "Male";    // Пример, преземете од вашиот систем
    var spendTime = localStorage.getItem('spendTime') || 0;
    var lastLogin = localStorage.getItem('lastLogin') || 'Never';

    document.getElementById('profileFirstName').innerText = profileFirstName;
    document.getElementById('profileLastName').innerText = profileLastName;
    document.getElementById('profileEmail').innerText = profileEmail;
    document.getElementById('profileGender').innerText = profileGender;
    document.getElementById('profileSpendTime').innerText = formatSpendTime(spendTime);
    document.getElementById('profileLastLogin').innerText = lastLogin;

    updateSpendTimeDisplay(); // Започни со ажурирање на времето поминато на страницата
}

// Форматирање на времето поминато во читаема форма
function formatSpendTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var seconds = seconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}

// Започни со следење на времето
function startTrackingTime() {
    var startTime = Date.now();
    setInterval(function () {
        var spendTime = parseInt(localStorage.getItem('spendTime')) || 0;
        var currentTime = Date.now();
        var timeSpent = Math.floor((currentTime - startTime) / 1000);

        localStorage.setItem('spendTime', spendTime + timeSpent);
        startTime = currentTime;

        updateSpendTimeDisplay(); // Ажурирај го прикажувањето на времето
    }, 1000);
}

// Функција за ажурирање на прикажувањето на времето поминато
function updateSpendTimeDisplay() {
    var spendTime = localStorage.getItem('spendTime') || 0;
    document.getElementById('profileSpendTime').innerText = formatSpendTime(spendTime);
}

// Зачувај го времето на последна најава при најава
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

// Пример функција за најава која ја повикува saveLastLogin
function loginUser() {
    saveLastLogin();
    // Овде ставете ја вашата логика за најава
    startTrackingTime();
}

// Пример функција за одјава која го зачувува времето поминато
function logoutUser() {
    var spendTime = parseInt(localStorage.getItem('spendTime')) || 0;
    localStorage.setItem('spendTime', spendTime);
}

// Проверка дали корисникот е најавен
function isUserLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return !!loggedInUser;
}

// Пример функција за следење на времето и продолжување со времето
function continueTrackingTime() {
    startTrackingTime();
}


//--------------------

// Функција за прикажување на профилот на корисникот
function showUserProfile() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    document.getElementById("user-name").textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    document.getElementById("user-profile").style.display = "block";
}

// Функција за криење на копчето за најава и прикажување на копчето за одјава
function hideLoginButton() {
    document.getElementById("loginRegisterBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("settingsBtn").style.display = "block";
}

// Функција за одјава на корисникот
document.getElementById('logoutLink').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser'); // Бришење на најавениот корисник од localStorage
    localStorage.removeItem('cartItems'); // Чистење на кошницата со продукти
    window.location.href = "/HomePage/index.html"; // Пренасочување кон страницата за најава
});

// Кога корисникот е најавен, прикажување на неговото име на десната страна
document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Корисникот е најавен
        document.getElementById('user-name').textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
        document.getElementById('user-profile').style.display = 'block';
        document.getElementById('loginRegisterBtn').style.display = 'none';
        document.getElementById('settingsBtn').style.display = 'block';
    } else {
        // Корисникот не е најавен
        document.getElementById('user-profile').style.display = 'none';
        document.getElementById('loginRegisterBtn').style.display = 'block';
        document.getElementById('settingsBtn').style.display = 'none';
    }

    // Прикажување и криење на менито за подесувања
    document.getElementById('settings-button').addEventListener('click', function() {
        const settingsMenu = document.getElementById('settingsMenu');
        settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Прикажување на профилот
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

    // Прикажување на модалниот прозорец за промена на лозинка
    document.getElementById('changePasswordLink').addEventListener('click', function() {
        const changePasswordModal = document.getElementById('changePasswordModal');
        changePasswordModal.style.display = 'block';
        document.body.classList.add('modal-open'); // Спречување на скролање на телото
        document.getElementById('settingsMenu').style.display = 'none';
    });

    // Затворање на модалниот прозорец за промена на лозинка
    document.getElementById('closeChangePasswordModal').addEventListener('click', function() {
        closeModal('changePasswordModal');
    });

    // Поднесување на формата за промена на лозинка
    document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Спречување на стандардното поднесување на формата

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

    // Прикажување на модалниот прозорец за деактивирање на акаунт
    document.getElementById('deactivateAccountLink').addEventListener('click', function() {
        const deactivateModal = document.getElementById('deactivateModal');
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        document.getElementById('deactivationEmail').value = loggedInUser.email; // Автоматски пополнување на email
        deactivateModal.style.display = 'block';
        document.body.classList.add('modal-open'); // Спречување на скролање на телото
    });

    // Затворање на модалниот прозорец за деактивирање на акаунт
    document.getElementById('closeDeactivateModal').addEventListener('click', function() {
        closeModal('deactivateModal');
    });

    document.getElementById('cancelDeactivationButton').addEventListener('click', function() {
        closeModal('deactivateModal');
    });

    // Поднесување на формата за деактивирање на акаунт
    document.getElementById('deactivateAccountForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Спречување на стандардното поднесување на формата

        const deactivationPassword = document.getElementById('deactivationPassword').value;
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (deactivationPassword === loggedInUser.password) {
            localStorage.removeItem(loggedInUser.email);
            localStorage.removeItem('loggedInUser');
            alert('Account successfully deleted.');
            closeModal('deactivateModal');
            window.location.href = "/HomePage/index.html";
        } else {
            alert('Incorrect password.');
        }
    });

    // Функција за затворање на модалните прозорци
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Овозможување на скролање на телото
    }

    // Слушател за настан за притискање на Enter во модалниот прозорец за деактивирање акаунт
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && document.getElementById('deactivateModal').style.display === 'block') {
            event.preventDefault();
            document.getElementById('deactivateAccountForm').dispatchEvent(new Event('submit'));
        }

        // Слушател за настан за притискање на Enter во модалниот прозорец за промена на лозинка
        if (event.key === 'Enter' && document.getElementById('changePasswordModal').style.display === 'block') {
            event.preventDefault();
            document.getElementById('changePasswordForm').dispatchEvent(new Event('submit'));
        }
    });

    // Слушател за настан за прикажување/скривање на лозинката
    document.getElementById('showPasswordCheckbox').addEventListener('change', function() {
        const currentPasswordInput = document.getElementById('currentPasswordChange');
        const newPasswordInput = document.getElementById('newPasswordChange');
        if (this.checked) {
            currentPasswordInput.type = 'text'; // Прикажување на лозинката
            newPasswordInput.type = 'text'; // Прикажување на лозинката
        } else {
            currentPasswordInput.type = 'password'; // Скривање на лозинката
            newPasswordInput.type = 'password'; // Скривање на лозинката
        }
    });
});
// Отворање на модалниот прозорец за профил
document.getElementById('profileLink').addEventListener('click', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    document.getElementById('profileFirstName').textContent = loggedInUser.firstName;
    document.getElementById('profileLastName').textContent = loggedInUser.lastName;
    document.getElementById('profileEmail').textContent = loggedInUser.email;
    document.getElementById('profileGender').textContent = loggedInUser.gender;
    const profileModal = document.getElementById('profileModal');
    profileModal.style.display = 'block';
    document.body.classList.add('modal-open'); // Спречување на скролање на телото
});

// Затворање на модалниот прозорец за профил
document.getElementById('closeProfileModal').addEventListener('click', function() {
    closeModal('profileModal');
});

// Функција за затворање на модалните прозорци
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Овозможување на скролање на телото
}

// Слушател за настан за прикажување/скривање на лозинката
document.getElementById('showLoginPassword').addEventListener('change', function() {
    const passwordInput = document.getElementById('loginPassword');
    if (this.checked) {
        passwordInput.type = 'text'; // Прикажување на лозинката
    } 
});

// Вчитување на претплатените емаил адреси од localStorage
let subscribedEmails = new Set(JSON.parse(localStorage.getItem('subscribedEmails')) || []);

// Функција за претплата
function subscribe(event) {
    event.preventDefault(); // Спречува стандардно поднесување на формата
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
        emailInput.value = ''; // Го брише полето за внесување
        messageDiv.style.display = 'block';
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Го крие порака по 5 секунди
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    } else {
        alert('Please enter a valid email address.');
    }
}

// Проверка дали корисникот веќе е претплатен на двете страници
function checkSubscriptionStatus() {
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();
    var messageDiv = document.getElementById('message');

    if (email && subscribedEmails.has(email)) {
        messageDiv.innerText = `The email ${email} is already subscribed.`;
        messageDiv.style.display = 'block';
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Го крие порака по 5 секунди
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);

        return true;
    }
    return false;
}

// -------------------------------------------------------------- //
