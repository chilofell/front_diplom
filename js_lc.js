document.addEventListener('DOMContentLoaded', () => {
    let popupEditor = document.getElementById('editor-curtains'),
        popupDevices = document.querySelectorAll('.device-link'),
        popupCloseButtons = document.querySelectorAll('.close'),
        popupAdd = document.getElementById('add-device'),
        addDeviceButton = document.getElementById('add-device-button'),
        popupTime = document.getElementById('send-time'),
        popupButton1 = document.getElementById('close-by-time'),
        popupButton2 = document.getElementById('open-by-time');

    // Открытие редактора устройства
    popupDevices.forEach(device => {
        device.onclick = function() {
            popupEditor.style.display = 'block';
        };
    });

    // Закрытие попапов по нажатию на крестик
    popupCloseButtons.forEach(button => {
        button.onclick = function() {
            button.parentElement.style.display = 'none';
        };
    });

    // Открытие попапа добавления устройства
    addDeviceButton.onclick = function() {
        popupAdd.style.display = 'block';
    };

    // Закрытие попапов при клике вне попапа
    window.onclick = function(event) {
        if (event.target == popupEditor) {
            popupEditor.style.display = 'none';
        } else if (event.target == popupAdd) {
            popupAdd.style.display = 'none';
        }
    };

    // Открытие попапа времени
    popupButton1.onclick = function() {
        popupTime.style.display = 'block';
    };
    popupButton2.onclick = function() {
        popupTime.style.display = 'block';
    };
});

function add(device) {
    console.log('Отправляемые данные:', device);
    fetch('http://5.23.53.69:8000/users/{user_id}/devices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Ошибка сети: ${res.status} - ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            document.getElementById('root').innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Ошибка при отправке данных на сервер:', error);
        });
}