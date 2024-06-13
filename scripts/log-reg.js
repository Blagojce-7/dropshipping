// Функција за капитализација на првата буква
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Функција за валидација на текстуалните полиња да содржат само букви
function validateNameInput(event) {
    const input = event.target;
    const value = input.value;

    // Отстранување на сите несакани карактери
    const sanitizedValue = value.replace(/[^a-zA-Z]/g, '');
    input.value = capitalize(sanitizedValue);
}

// Додавање на слушатели на настани за валидација на полињата за име и презиме
document.getElementById('signUpFirstName').addEventListener('input', validateNameInput);
document.getElementById('signUpLastName').addEventListener('input', validateNameInput);

// Земаме ги копчињата и контејнерот преку нивните ID
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Слушател на настани за копчето за регистрација кое додава класа "right-panel-active" на контејнерот
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

// Слушател на настани за копчето за најава кое ја отстранува класата "right-panel-active" од контејнерот
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Поднесување на формата за регистрација
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Спречува стандардно поднесување на формата
    
    const signUpType = document.getElementById('signUpType').value;
    const firstName = capitalize(document.getElementById('signUpFirstName').value);
    const lastName = capitalize(document.getElementById('signUpLastName').value);
    const email = document.getElementById('signUpEmail').value;
    const gender = document.getElementById('signUpGender').value;
    const password = document.getElementById('signUpPassword').value;

    // Проверка дали email веќе постои
    if (localStorage.getItem(email)) {
        alert('A profile with this email already exists.');
        return;
    }

    // Проверка дали има најмалку 5 карактери во лозинката
    if (password.length < 5) {
        alert('Password must be at least 5 characters long.');
        return;
    }

    // Проверка дали првото и последното име содржат само букви
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

    localStorage.setItem(email, JSON.stringify(user)); // Зачувува кориснички податоци во localStorage
    alert('Profile created successfully!');
    document.getElementById('signUpForm').reset(); // Го ресетира формуларот за регистрација
});

// Поднесување на формата за најава
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Спречува стандардно поднесување на формата
    
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    const user = JSON.parse(localStorage.getItem(email));

    // Проверка на кориснички податоци
    if (user) {
        if (user.signUpType === 'primary' && user.password === password) {
            localStorage.setItem('loggedInUser', JSON.stringify(user)); // Го зачувува најавениот корисник во localStorage
            alert('Login successful!');
            // Пренасочување кон home страницата со име и презиме како параметри во URL
            window.location.href = `/index.html?firstName=${user.firstName}&lastName=${user.lastName}`;
        } else if (user.signUpType !== 'primary' && user.password === password) {
            alert(`Please use ${user.signUpType} to log in.`);
        } else {
            alert('Invalid email or password. Please try again.');
        }
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

// Функционалност за заборавена лозинка
document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.sign-in-container').style.display = 'none';
    document.querySelector('.sign-up-container').style.display = 'none';
    document.getElementById('forgotPasswordContainer').style.display = 'flex';
    document.querySelector('.overlay-container').style.display = 'none'; // Го крие десниот overlay
    document.body.classList.add('modal-open'); // Спречување на скролање
});

document.getElementById('backToLoginButton').addEventListener('click', function(event) {
    document.getElementById('forgotPasswordContainer').style.display = 'none';
    document.querySelector('.sign-in-container').style.display = 'block';
    document.querySelector('.overlay-container').style.display = 'block';
    document.querySelector('.sign-up-container').style.display = 'block';
    document.body.classList.remove('modal-open'); // Овозможување на скролање
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('forgotPasswordEmail').value;
    const user = JSON.parse(localStorage.getItem(email));

    // Проверка дали корисникот постои
    if (user) {
        const newPassword = Math.random().toString(36).slice(-8); // Генерира случајна нова лозинка од 8 карактери
        user.password = newPassword;
        localStorage.setItem(email, JSON.stringify(user)); // Го ажурира корисникот во localStorage
        alert(`Your new password is: ${newPassword}`);
        // Го крие формуларот за заборавена лозинка
        document.getElementById('forgotPasswordContainer').style.display = 'none';
        // Го прикажува формуларот за најава и overlay
        document.querySelector('.sign-in-container').style.display = 'block';
        document.querySelector('.overlay-container').style.display = 'block';
        document.querySelector('.sign-up-container').style.display = 'block';
        document.body.classList.remove('modal-open'); // Овозможување на скролање
    } else {
        alert('No profile with this email.');
    }
});
// Социјална најава и регистрација
function simulateSocialLogin(provider) {
    const modal = document.getElementById("loginModal");
    const closeButton = document.querySelector(".close");
    const cancelButton = document.getElementById("modalCancel");
    const submitButton = document.getElementById("modalSubmit");
    const providerName = document.getElementById("providerName");
    const providerLogo = document.getElementById("providerLogo");

    // Поставување на логото и текстот за социјално логирање
    switch(provider) {
        case 'Facebook':
            providerLogo.src = "/images/facebook.webp";
            break;
        case 'Google':
            providerLogo.src = "/images/google.png";
            break;
        case 'LinkedIn':
            providerLogo.src = "/images/linked.webp";
            break;
    }
    providerLogo.alt = provider + " Logo";
    providerName.innerHTML = `<img id="providerLogo" src="${providerLogo.src}" alt="${providerLogo.alt}"> Login with ${provider}`;

    // Прикажи го модалниот прозорец
    modal.style.display = "block";

    // Функција за затворање на модалниот прозорец
    const closeModal = function() {
        modal.style.display = "none";
        resetEventListeners();
    };

    // Кога корисникот ќе кликне на X копчето, затвори го модалниот прозорец
    closeButton.onclick = closeModal;

    // Кога корисникот ќе кликне на копчето Cancel, затвори го модалниот прозорец
    cancelButton.onclick = closeModal;

    // Функција за поднесување на формата
    const login = function() {
        const email = document.getElementById("modalEmail").value;
        const password = document.getElementById("modalPassword").value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        const user = JSON.parse(localStorage.getItem(email));

        // Проверка дали корисникот постои
        if (user && user.signUpType === provider.toLowerCase() && user.password === password) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            alert(`Successful login with ${provider}!`);
            window.location.href = '/index.html';
        } else {
            alert(`No profile associated with this ${provider} email or password. Please register.`);
        }

        // Затвори го модалниот прозорец
        closeModal();
    };

    // Кога корисникот ќе кликне на Submit копчето
    submitButton.onclick = login;

    // Кога корисникот ќе притисне Enter
    const keydownHandler = function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            login();
        }
    };
    modal.addEventListener('keydown', keydownHandler);

    // Функција за ресетирање на слушателите за настани
    function resetEventListeners() {
        closeButton.onclick = null;
        cancelButton.onclick = null;
        submitButton.onclick = null;
        modal.removeEventListener('keydown', keydownHandler);
    }
}

// Слушатели за настани за социјална најава и регистрација
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

// За проверка на акааунт во local storage
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    try {
        let user = JSON.parse(value);
        if (user && user.email) { // Додадете дополнителни проверки ако е потребно
            console.log(`User Profile - Email: ${user.email}, First Name: ${user.firstName}, Last Name: ${user.lastName}, Gender: ${user.gender}`);
        }
    } catch (e) {
        // Некои клучеви можеби не се профили на корисници, така што може да се игнорираат JSON грешки
    }
}
console.log(localStorage);

// За бришење на локална меморија - сите податоци
// localStorage.clear();
