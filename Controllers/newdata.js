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
    }, 500);
    }

function addItems(){ // Ez az egész egy kín szenvedés volt, lehet egy kicsit hosszú is, de legalább működik, úgyhogy kit érdekel.

    let date = document.querySelector('#date');
    let type = document.querySelector('input[name = "inlineRadioOptions"]:checked');
    let items = document.querySelector('#items');
    let tipusok = document.querySelector('#tipusok');
    let custom_tipusok = document.querySelector('#custom_tipusok');

    if (date.value == "" || type == null){
        showMessage("Nem adtál meg minden adatot!");
    }
    else{
        let vane = false;
        let upID = -1;
        axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
            res.data.forEach(item => {
            if (item.userID == loggedUser.ID && item.date.split('T')[0] == date.value && item.typeID == type.value){
                axios.get(`${serverURL}/catgs/`).then(catDATA => {
                    catDATA.data.forEach(thing => {
                        if (thing.ID == item.tagID){
                            upID = item.ID
                            vane = true
                            return;
                        }
                    })
                })
            }
            })
        })
        setTimeout(()=>{
            if (vane){
                let data = {
                    amount : items.value
                }
                axios.patch(`${serverURL}/items/ID/eq/${upID}`, data).then(req =>{
                    date.value = null;
                    items.value = 0;
                    custom_tipusok.value = "";
                })
                alert("Adat sikeresen frissítve!");
            }
            else if (!vane){
                let newData = {
                    userID : loggedUser.ID,
                    date : date.value,
                    typeID : type.value,
                    amount : items.value,
                    tagID : null
                }
                if (custom_tipusok.value.length == 0){ // Ha nem saját kategóriát adunk meg
                    axios.get(`${serverURL}/catgs/`).then(catDATA => {
                        catDATA.data.forEach(catInstance =>{
                            if (catInstance.tagname == tipusok.value){
                                newData.tagID = catInstance.ID;
                                axios.post(`${serverURL}/items/`, newData).then(req =>{
                                    date.value = null;
                                    items.value = 0;
                                    custom_tipusok.value = "";
                                })
                                alert("Adat sikeresen rögzítve!");
                            }
                        }
                        )
                    })
                }
                else{
                    axios.get(`${serverURL}/catgs/`).then(catDATA => {
                        let vanilyen = false
                        catDATA.data.forEach(catInstance =>{
                            if (catInstance.tagname == custom_tipusok.value){ // Ha már létezik ez a kategória, ne adjuk a másik táblához megint.
                                newData.tagID = catInstance.ID;
                                axios.post(`${serverURL}/items/`, newData).then(req =>{
                                    date.value = null;
                                    items.value = 0;
                                    custom_tipusok.value = "";
                                })
                                alert("Adat sikeresen rögzítve!");
                                vanilyen = true;
                                return;
                            }
                        })
                        if (!vanilyen){
    
                            let newCat = { // Ha nem találta, akkor hozzáadjuk az új kategóriát
                                tagname : custom_tipusok.value
                            }
                            axios.post(`${serverURL}/catgs/`, newCat).then(cucmákocska => {
                                catDATA.data.forEach(catInstance =>{
                                    if (catInstance.tagname == custom_tipusok.value){ 
                                        newData.tagID = catInstance.ID;
                                        axios.post(`${serverURL}/items/`, newData).then(req =>{
                                            date.value = null;
                                            items.value = 0;
                                            custom_tipusok.value = "";
                                        })
                                        alert("Adat sikeresen rögzítve!");
                                        return;
                                    }
                                })
                            })
                        }
                    })
                }
            }
        }, 100)
        
    }
}

getToday();
TagLoader();