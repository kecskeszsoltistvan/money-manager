
function showChart(){
  let stuff = {
    labels : [],
    income : [],
    expense : [],
    daily_status : []
  }

  axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a,b) => a.date.localeCompare(b.date));
    res.data.forEach((item) => {
      if (!stuff.labels.includes(item.date.toString().split("T")[0])){
        stuff.labels.push(item.date.toString().split("T")[0])
      };
      axios.get(`${serverURL}/items/date/eq/${item.date}/`).then(req =>{
        let x = (stuff.daily_status.length == 0) ? 0 : stuff.daily_status[stuff.daily_status.length - 1];
        let y = 0;
        let z = 0;
        req.data.forEach(instance => {
          if (instance.userID == loggedUser.ID){
            if(instance.typeID == 1){
              x += instance.amount;
              y += instance.amount;
            }
            else {
              x -= instance.amount
              z -= instance.amount;
            }
          }
        })
        stuff.daily_status.push(x);
        stuff.income.push(y);
        stuff.expense.push(z);
        y = 0;
        z = 0;
      })
      
    });
  });
console.log(stuff);

  setTimeout(() => {
    const ctx = document.getElementById("myChart1");
    const cty = document.getElementById("myChart2");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: stuff.labels,
        datasets: [
          {
            label: "Bevétel:",
            data: stuff.income,
            borderWidth: 3,
          },
          {
            label: "Kiadás:",
            data: stuff.expense,
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
        labels: stuff.labels,
        datasets: [
          {
            label: "Állapot:",
            data: stuff.daily_status,
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
  }, 1000);
}
