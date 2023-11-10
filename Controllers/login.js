function login(){
    let email = document.querySelector('#email');
    let passwd = document.querySelector('#passwd');

    if (email.value == "" || passwd.value == "" ){
        showMessage("Nem adtál meg minden adatot!");
    }
    else{
        let data = {
            email: email.value,
            passwd: passwd.value
        }
        axios.post(`${serverURL}/logincheck`, data).then(res => {
            if(res.data.length == 0){
                showMessage("Hibás belépési adatok!");
            }else
            {
                sessionStorage.setItem('stepCounterAppUser', JSON.stringify(res.data[0]));
                document.location.href='index.html';
            }
        })
    }
}


function logout(){
    sessionStorage.removeItem('stepCounterAppUser');
    document.location.href='index.html';
}