function setMaxDate(){
    let date = document.querySelector('#date');
    date.max =  new Date().toISOString().split("T")[0];
}

function getToday(){
    setTimeout(()=>{setMaxDate()}, 500);
}


function TagLoader(){
    setTimeout(()=>{

        let tipusok = document.querySelector('#tipusok');
        axios.get(`${serverURL}/catgs`).then(res=>{
            res.data.forEach(item =>{
                let opcio = document.createElement('option');
                opcio.value = item.tagname;
                opcio.text = item.tagname;
                tipusok.appendChild(opcio);
            })
        })
    }, 100);
    }

function addItems(){

    let date = document.querySelector('#date');
    let type = document.querySelector('#type');
    let items = document.querySelector('#items');
    let tipusok = document.querySelector('#tipusok');
    let custom_tipusok = document.querySelector('#custom_tipusok');

    if (date.value == ""){
        showMessage("Nem adtál meg minden adatot!");
    }
    else{
        console.log(`Má' megint kezdődik`);
        axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
            let vane = false;
            let upID = -1;
            console.log(`Generálás...`);
            res.data.forEach(item => {
            let cucc = item
                axios.get(`${serverURL}/catgs/`).then(x=>{
                    if (item.date.split('T')[0] == date.value){
                        vane = true;
                        upID = item.ID;
                        return;
                    }
                })
            });
            if(vane){
                let data = {
                    items : items.value	
                }
                axios.patch(`${serverURL}/items/ID/eq/${upID}`, data).then((res)=>{
                    alert('Az érték módosítva!');
                    date.value = null;
                    items.value = 0;
                });
            }
            else{
                if (item.date.split('T')[0] == date.value){
                    let data = {
                        userID : loggedUser.ID,	
                        date : date.value,	
                        typeID : x.ID,
                        amount : items.value,	
                    }
    
                    axios.post(`${serverURL}/items`, data).then((res)=>{
                        alert('A lépésszám rögzítve!');
                        date.value = null;
                        items.value = 0;
                    });
                }
            }
        })
    }
}

getToday();
TagLoader();
