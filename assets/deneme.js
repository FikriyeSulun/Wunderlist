const createAccountBtn = document.querySelector('.cfa button');
const signInBtn = document.querySelector('.singIn button');
const logo = document.querySelector('.logo');
const loginScreen = document.querySelector('.loginScreen');

// Kullanıcıları yerel depolamada saklamak için anahtar
const USERS_KEY = 'users';

// Kullanıcıları yerel depolamadan al
function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem(USERS_KEY);
    return JSON.parse(usersJSON) || []; // Eğer depoda kullanıcı yoksa boş bir dizi döndür
}

// Kullanıcıları yerel depolamaya kaydet
function saveUsersToLocalStorage(users) {
    const usersJSON = JSON.stringify(users);
    localStorage.setItem(USERS_KEY, usersJSON);
}

// Kullanıcıları yerel depolamadan al
let users = getUsersFromLocalStorage();

// Kullanıcı oluşturma işlemi
function createUser(email, username, password) {
    const user = {
        email: email,
        username: username,
        password: password
    };
    users.push(user); // Yeni kullanıcıyı diziye ekle
    saveUsersToLocalStorage(users); // Kullanıcıları yerel depolamaya kaydet
    console.log(`User created with email: ${email}`);
}

// Kullanıcı girişi işlemi
function signIn(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        console.log(`Signed in as ${user.username}`);
    } else {
        console.log('Invalid email or password');
    }
}

// Kullanıcıyı yerel depolamadan silme işlemi
function deleteUserFromLocalStorage(email) {
    users = users.filter(user => user.email !== email); // Eşleşen kullanıcıyı filtrele
    saveUsersToLocalStorage(users); // Kullanıcıları güncellenmiş haliyle tekrar yerel depolamaya kaydet
    console.log(`User deleted with email: ${email}`);
}

// Sign In butonuna tıklama olayı
signInBtn.addEventListener('click', function () {
    createAccountBtn.remove();

    // Create the form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('formContainer');

    // Create the form element
    const form = document.createElement('form');

    // Create the Username input element
    const usernameInput = document.createElement('input');
    usernameInput.required = true;
    usernameInput.type = 'text';
    usernameInput.name = 'username';
    usernameInput.placeholder = 'Username';

    // Create the Password input element
    const passwordInput = document.createElement('input');
    passwordInput.required = true;
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'Password';


    // Create the Create Free Account button element
    const SignInBtn = document.createElement('button');
    SignInBtn.innerText = 'Sign In';

    // Add the input elements to the form element
    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    form.appendChild(SignInBtn);

    // Add the form element to the form container
    formContainer.appendChild(form);

    // Add the form container to the login screen
    loginScreen.insertBefore(formContainer, logo.nextSibling);

    // Remove the Sign In button
    signInBtn.remove();

    SignInBtn.addEventListener('click', function () {
    const username = ''; // username girişini burada almanız gerekiyor
    const password = ''; // Şifre girişini burada almanız gerekiyor
    signIn(username, password);
        window.location.href = './index.html'; // Kullanıcıyı başka bir sayfaya yönlendir
    });
});

// Create Account butonuna tıklama olayı
createAccountBtn.addEventListener('click', function () {
    // Remove the Sign In button
    signInBtn.remove();

    // Create the form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('formContainer');

    // Create the form element
    const form = document.createElement('form');


    // Create the Email input element
    const emailInput = document.createElement('input');
    emailInput.required = true;
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'Email';

    // Create the Username input element
    const usernameInput = document.createElement('input');
    usernameInput.required = true;
    usernameInput.type = 'text';
    usernameInput.name = 'username';
    usernameInput.placeholder = 'Username';

    // Create the Password input element
    const passwordInput = document.createElement('input');
    passwordInput.required = true;
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'Password';

    // Create the Create Free Account button element
    const createFreeAccountBtn = document.createElement('button');
    createFreeAccountBtn.innerText = 'Create Free Account';

    // Add the input elements to the form element
    form.appendChild(emailInput);
    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    form.appendChild(createFreeAccountBtn);

    // Add the form element to the form container
    formContainer.appendChild(form);

    // Add the form container to the login screen
    loginScreen.insertBefore(formContainer, logo.nextSibling);

    // Remove the Create Free Account button
    createAccountBtn.remove();

    createFreeAccountBtn.addEventListener('click', function () {
        const email = ''; // Email girişini burada almanız gerekiyor
        const username = ''; // Kullanıcı adı girişini burada almanız gerekiyor
        const password = ''; // Şifre girişini burada almanız gerekiyor
        createUser(email, username, password);
        alert('Kaydınız yapıldı');

    })
});

