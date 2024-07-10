let name = document.querySelector('#name');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let submit = document.querySelector('#submit');

let users = {};

function User(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
}

function createId(users) {
    return Object.keys(users).length;
}

submit.addEventListener('click', async() => {
    const nameUser = name.value;
    const emailUser = email.value;
    const passwordUser = password.value;

    const user = new User(nameUser, emailUser, passwordUser);

    const userId = 'User' + createId(users);
    users[userId] = user;
    console.log(users);

    alert(`Пользователь ${nameUser} успешно зарегистрировался.`)

    await registration(user);
})


function registration(user) {
    console.log('Отправляемые данные:', user);
    fetch('http://5.23.53.69:8000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка сети: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    })
    .then(data => {
        document.getElementById('root').innerHTML = JSON.stringify(data);
        // Переход на другую страницу после успешного завершения регистрации на сервере
        location.href = 'personal_area.html';
    })
    .catch(error => {
        console.error('Ошибка при отправке данных на сервер:', error);
    });
}
