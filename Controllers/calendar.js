
function showCalendar(){
    let myEvents = [];
    axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
        res.data.forEach(item => {
            console.log(`${item.tagID}`);
            let category = ""
            axios.get(`${serverURL}/catgs/ID/eq/${item.tagID}`).then(catDATA => {
                category = catDATA.data[0].tagname;
                
                myEvents.push({
                    title: `${category}:\n${item.amount}`,
                    start: item.date,
                    allDay: true,
                    backgroundColor: item.typeID == 0 ? '#6c3333' : '#336c56',
                    borderColor: item.typeID == 0 ? '#6c3333' : '#336c56',
                })
            })

            
        });
    });

    setTimeout(()=>{

        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
        },
        initialDate: new Date(),
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        dayMaxEvents: true, // allow "more" link when too many events
        events: myEvents
        });
        
        calendar.render();
    }, 400);
}
