const URL = "http://56a7663d873c.ngrok.io/movie/";



// It will be responsible for fetching data from specified url
const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


const fetchData = ( url, cb) => {
    let fetchUrl = `${URL}/${url}`;
    const fetcherData = fetcher(fetchUrl);
    fetcherData.then(data => {
        cb(data)
    });
}


// Data Formation of DOMS
function formTableData(data) {
    let elements = "";
    data.forEach(el => {
        elements += `<tr>
        <td>${el?.title}</td>
        <td>${el?.genre}</td>
        <td>${el?.count}</td>
        <td>${el?.fulfilled ? 'YES' : 'NO'}</td>
        <td>${el?.imdbTitleId}</td>
    </tr>`

    const domElement = document.getElementById("tableData");
    domElement.innerHTML = elements;
    $(document).ready(function() {
     let table =   $('#dataTable').DataTable();
     table.order([2,"desc"]).draw();
      });

    })
  }

function formPieChart(data) {

    console.log(data);
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["FulFilled", "Total", "Un FulFilled"],
        datasets: [{
          data: [data.fulfilled, data.total, data.unFulfilled],
          backgroundColor: ['#007bff', '#dc3545', '#ffc107'],
        }],
      },
    });
}

function formBarChar(chartData) {
   
    // chartData = chartData.slice(0, 5);
   
    let labels = chartData.map(dt => dt.genre);
    let data = chartData.map(dt => dt.count);
    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: "Count",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: data,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'month'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 100
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              maxTicksLimit: 5
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: true
        }
      }
    });
}

  


fetchData("wishes", formTableData);
fetchData("metric",formPieChart);
fetchData("genre-count",formBarChar);