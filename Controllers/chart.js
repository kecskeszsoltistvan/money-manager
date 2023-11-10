
function showChart(){
    let labels = [];
    let datas = [];

  axios.get(`${serverURL}/steps/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a,b) => a.date.localeCompare(b.date));
    res.data.forEach((item) => {
      labels.push(item.date.toString().split("T")[0]);
      datas.push(item.steps);
    });
  });

  setTimeout(() => {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Lépésszám:",
            data: datas,
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, 500);
}
