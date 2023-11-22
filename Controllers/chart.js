
function showChart(){
    let labels = [];
    let income = [];
    let expense = [];
    let daily_status = [];

  axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a,b) => a.date.localeCompare(b.date));
    res.data.forEach((item) => {
      labels.push(item.date.toString().split("T")[0]);
      if (item.typeID == 1){
        income.push(item.amount);
      }
      else {
        expense.push(item.amount * -1);
      }
      
      axios.get(`${serverURL}/items/date/eq/${item.date}/`).then(req =>{
        let x = (daily_status.length == 0) ? 0 : daily_status[daily_status.length - 1];
        req.data.forEach(instance => {
          console.log(instance);
          if (instance.userID == loggedUser.ID){
            if(instance.typeID == 1){
              x += instance.amount
            }
            else {
              x -= instance.amount
            }
          }
        })
        daily_status.push(x);
      })
      
    });
  });

  setTimeout(() => {
    const ctx = document.getElementById("myChart1");
    const cty = document.getElementById("myChart2");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Bevétel:",
            data: income,
            borderWidth: 3,
          },
          {
            label: "Kiadás:",
            data: expense,
            borderWidth: 3,
          }
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Napi bevétel/kiadás arány'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },
    });

    new Chart(cty, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Állapot:",
            data: daily_status,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Pénz mennyisége összesen'
          }
        }
      },
    });
  }, 500);
}
