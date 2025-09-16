$(document).ready(function () {
  $.getJSON("settings.json", function (data) {
      var tableData = data.map(function (item) {
          return [
              item.Machine,
              item.Location,
              item.Status,
              item.Product,
              item.Category,
              item.Transaction,
              item.TransDate,
              item.Type,
              item.RCoil,
              item.RPrice,
              item.RQty,
              item.MCoil,
              item.MPrice,
              item.MQty,
              item.LineTotal,
              item.TransTotal,
          ];
      });

      $('#example').DataTable({
          data: tableData,
          columns: [
            { title: 'Machine' },
            { title: 'Location' },
            { title: 'Status' },
            { title: 'Product' },
            { title: 'Category' },
            { title: 'Transaction'},
            { title: 'TransDate'},
            { title: 'Type'},
            { title: 'RCoil'},
            { title: 'RPrice'},
            { title: 'RQty'},
            { title: 'MCoil'},
            { title: 'MPrice'},
            { title: 'MQty'},
            { title: 'LineTotal'},
            { title: 'TransTotal'},
        ],
      });
  });
});

let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'bar', // or any other chart type
    data: {
        labels: [], // We'll fill these in with our data
        datasets: [{
            label: 'sales per machine unit', // Also filled in with data
            data: [],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
            ],
            borderWidth: 1
        }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let ctx2 = document.getElementById('myChart2').getContext('2d');
let myChart2 = new Chart(ctx2, {
    type: 'bar', // or any other chart type
    data: {
        labels: [], // We'll fill these in with our data
        datasets: [{
            label: 'sales total', // Also filled in with data
            data: [],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
            ],
            borderWidth: 1
        }]
    },
    options: {
      indexAxis: 'x',
      responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let ctx3 = document.getElementById('myChart3');  
let myChart3 = new Chart(ctx3, {
    type: 'bar', // or any other chart type
    data: {
        labels: [], // We'll fill these in with our data
        datasets: [{
            label: 'Top 5 of Popular Products', // Also filled in with data
            data: [],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
            ],
            borderWidth: 1
        }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let ctx4 = document.getElementById('myChart4').getContext('2d');
let myChart4 = new Chart(ctx4, {
  type: 'line',
  data: {
    labels: ['1-2022', '2-2022', '3-2022', '4-2022', '5-2022', '6-2022', '7-2022', '8-2022', '9-2022', '10-2022', '11-2022', '12-2022'],
    datasets: [{
      label: '', // Menghapus label dataset
      data: [250, 260, 250, 270, 290, 320, 350, 330, 300, 200, 230, 260],
      borderWidth: 1,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      pointBackgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
      ]
    }],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false // Menyembunyikan legenda
      },
      title: {
        display: false // Menyembunyikan judul
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});




let chrt = document.getElementById("chartId").getContext("2d");
let chartId = new Chart(chrt, {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
      label: "type of payment total",
      data: [],
      backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
      ],            
      hoverOffset: 5
      }],
    },
    options: {
      responsive: true,
    },
});

function updateChart() {
  const selectedLocation = document.getElementById('locationSelect').value;

  // Baca data dari file settings.json
  fetch('settings.json')
    .then(response => response.json())
    .then(data => {
      let filteredData;

      if (selectedLocation === 'All') {
        // Jika 'All' dipilih, gunakan semua data
        filteredData = data;
      } else {
        // Filter data untuk hanya menyertakan item dari lokasi yang dipilih
        filteredData = data.filter(item => item.Location === selectedLocation);
      }

      // CHART 1: Mengelompokkan data berdasarkan nama machine dan menjumlahkan MQty
      const machineData = {};
      filteredData.forEach(item => {
        if (!machineData[item.Machine]) {
          machineData[item.Machine] = 0;
        }
        machineData[item.Machine] += item.MQty;
      });

      const labels1 = Object.keys(machineData);
      const dataValues1 = Object.values(machineData);

      myChart.data.labels = labels1;
      myChart.data.datasets[0].data = dataValues1;
      myChart.update();

      // CHART 2: Mengelompokkan data berdasarkan nama category dan menjumlahkan RQty
      const categoryData = {};
      filteredData.forEach(item => {
        if (!categoryData[item.Category]) {
          categoryData[item.Category] = 0;
        }
        categoryData[item.Category] += item.RQty;
      });

      const labels2 = Object.keys(categoryData);
      const dataValues2 = Object.values(categoryData);

      myChart2.data.labels = labels2;
      myChart2.data.datasets[0].data = dataValues2;
      myChart2.update();

      // CHART 3: Mengelompokkan data berdasarkan nama Product dan menjumlahkan MQty
      const productData = {};
      filteredData.forEach(item => {
        if (!productData[item.Product]) {
          productData[item.Product] = 0;
        }
        productData[item.Product] += item.MQty;
      });

      const sortedProductData = Object.entries(productData)
        .map(([Product, MQty]) => ({ Product, MQty }))
        .sort((a, b) => b.MQty - a.MQty)
        .slice(0, 5);

      const labels3 = sortedProductData.map(item => item.Product);
      const dataValues3 = sortedProductData.map(item => item.MQty);

      myChart3.data.labels = labels3;
      myChart3.data.datasets[0].data = dataValues3;
      myChart3.update();

      // CHART 4: Mengelompokkan data berdasarkan bulan dan menjumlahkan LineTotal
      const monthData = {};
      filteredData.forEach(item => {
        const transDate = new Date(item.TransDate);
        const month = transDate.getMonth();
        const year = transDate.getFullYear();
        const key = `${month}-${year}`;

        if (!monthData[key]) {
          monthData[key] = { month: month + 1, year: year, total: 0 }; // Menambahkan +1 ke bulan untuk format 1-12
        }
        monthData[key].total += item.LineTotal;
      });

      const labels4 = [];
      const dataValues4 = [];
      for (const key in monthData) {
        labels4.push(`${monthData[key].month}-${monthData[key].year}`);
        dataValues4.push(monthData[key].total);
      }

      myChart4.data.labels = labels4;
      myChart4.data.datasets[0].data = dataValues4;
      myChart4.update();

      // CHART 5: Mengelompokkan data berdasarkan tipe pembayaran
      const paymentData = {};
      filteredData.forEach(item => {
        if (!paymentData[item.Type]) {
          paymentData[item.Type] = 0;
        }
        paymentData[item.Type] += 1;
      });

      const labels5 = Object.keys(paymentData);
      const dataValues5 = Object.values(paymentData);

      chartId.data.labels = labels5;
      chartId.data.datasets[0].data = dataValues5;
      chartId.update();
    })
    .catch(error => console.error('Error reading settings.json:', error));
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

updateChart();

// Ambil elemen tombol "About Us"
var aboutUsBtn = document.getElementById("aboutUsBtn");
      
// Ambil elemen modal
var modal = document.getElementById("myModal");

// Tambahkan event listener untuk tombol "About Us"
aboutUsBtn.addEventListener("click", function() {
  // Tampilkan modal saat tombol "About Us" diklik
  modal.style.display = "block";
});

