
function showChart(){
    let labels = [];
    let income = [];
    let expense = [];

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
    });
  });

  setTimeout(() => {
    const ctx = document.getElementById("myChart1");

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
  }, 500);
}
