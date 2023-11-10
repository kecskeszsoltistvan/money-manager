//const serverURL = 'http://172.16.100.25:5000';
const serverURL = 'http://localhost:5000';

let loggedInMenu = document.querySelector('#loggedInMenu');
let loggedOutMenu = document.querySelector('#loggedOutMenu');

async function render(view){
    let main = document.querySelector('main');
    main.innerHTML = await (await fetch(`Views/${view}.html`)).text();
}

function showMessage(msg){
    let alertBox = document.querySelector('#alertBox');
    alertBox.innerHTML = `<strong>HIBA!</strong> ${msg}`;
    alertBox.classList.remove('d-none');
}

let loggedUser = JSON.parse(sessionStorage.getItem('stepCounterAppUser'));

if (loggedUser != null){
    loggedOutMenu.classList.add('d-none');
    loggedInMenu.classList.remove('d-none');
    render('newdata');
}
else
{
    loggedInMenu.classList.add('d-none');
    loggedOutMenu.classList.remove('d-none');
    render('login');
}

