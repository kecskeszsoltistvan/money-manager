function registerUser(){
    let name = document.querySelector('#name');
    let email = document.querySelector('#email');
    let passwd = document.querySelector('#passwd');
    let confirm = document.querySelector('#confirm');

    if (name.value == "" || email.value == "" || passwd.value == "" || confirm.value == ""){
        showMessage("Nem adtál meg minden adatot!");
    }
    else{
        if (passwd.value != confirm.value){
            showMessage("A megadott jelszavak nem egyeznek!");
        }
        else
        {
            axios.get(`${serverURL}/users/email/eq/${email.value}`).then(res =>{
                if (res.data.length > 0){
                    showMessage("Ez az e-mail cím már regisztrálva van!");
            }
            else
            {
                let newUser = {
                    name: name.value,
                    email: email.value,
                    passwd: passwd.value
                } 
                axios.post(`${serverURL}/users`, newUser).then(res =>{
                     alert('Sikeres regisztráció! Most már beléphetsz!');
                     document.location.href = 'index.html';
                });
            }
            });
           
        }
    }
}