function setMaxDate(){
    let date = document.querySelector('#date');
    date.max =  new Date().toISOString().split("T")[0];
}

function getToday(){
    setTimeout(()=>{setMaxDate()}, 500);
}

function addSteps(){

    let date = document.querySelector('#date');
    let steps = document.querySelector('#steps');

    if (date.value == "" || steps.value == 0 ){
        showMessage("Nem adtál meg minden adatot!");
    }
    else{
        axios.get(`${serverURL}/steps/userID/eq/${loggedUser.ID}`).then(res=>{
            let vane = false;
            let upID = -1;
            res.data.forEach(item => {
                if (item.date.split('T')[0] == date.value){
                    vane = true;
                    upID = item.ID;
                    return;
                }
            });
            if(vane){
                let data = {
                    steps : steps.value	
                }
                axios.patch(`${serverURL}/steps/ID/eq/${upID}`, data).then((res)=>{
                    alert('A lépésszám módosítva!');
                    date.value = null;
                    steps.value = 0;
                });
            }
            else{
                let data = {
                    userID : loggedUser.ID,	
                    date : date.value,	
                    steps : steps.value	
                }

                axios.post(`${serverURL}/steps`, data).then((res)=>{
                    alert('A lépésszám rögzítve!');
                    date.value = null;
                    steps.value = 0;
                });
            }
        })
    }
}

getToday();
