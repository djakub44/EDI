document.addEventListener("DOMContentLoaded", function () {

    fetchData();

    function fetchData() {
        
        const apiKey = 'a90a3a10';
        const apiUrl = `https://my.api.mockaroo.com/country_api.json?key=${apiKey}`;

        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayData(data) {
        const dataContainer = document.getElementById('data-container');

        
        if (Array.isArray(data) && data.length > 0) {
            
            const table = document.createElement('table');
            table.className = 'table table-bordered';

            
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            //DJ to keep data for charts
            const arrCountryPopulation =[];
            let intMonumentCounterYes = 0;
            let intMonumentCounterNo = 0;
            Object.keys(data[0]).forEach(key => {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);

            });
            
            

            thead.appendChild(headerRow);
            table.appendChild(thead);

            
            const tbody = document.createElement('tbody');
            let i = 0

            data.forEach(item => {
                const row = document.createElement('tr');
                
                //DJ get data for charts
                arrCountryPopulation[i] = []
                arrCountryPopulation[i][0]=item["country_name"];
                arrCountryPopulation[i][1]=item["population"];
                if (item["has_national_monument"] == true) {
                  intMonumentCounterYes++;
                }
                else{
                  intMonumentCounterNo++;
                }

                Object.values(item).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);  
                });

                i = i + 1;
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);

            
            dataContainer.appendChild(table);

            //DJ create a chart
            CreatechartCoutryPopulation(arrCountryPopulation); 
            CreatechartMonument(intMonumentCounterYes,intMonumentCounterNo);
        } else {

            dataContainer.textContent = 'No data available.';
        }
        
    }

    //create a bar chart of top 10 countries by population
    function CreatechartCoutryPopulation(arrCountryPopulation){

        const countries = [];
        const population = [];

        arrCountryPopulation.sort(SortPopulation);
        
        function SortPopulation(a, b) {
            return b[1]-a[1]
        }

        for (let i = 0; i < 10; i++) {
            countries[i] = arrCountryPopulation[i][0];
            population[i] = arrCountryPopulation[i][1];
        };

        const ctx = document.getElementById('CountryPopulationChart');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: countries,
            datasets: [{
              label: 'Population',
              data: population,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                min: arrCountryPopulation[0][1]*85/100 //to better reflect differences
                
              }
              
            }
          }
          
          
        });
    }
    
    //creates Pie chart for monuments
    function CreatechartMonument(intMonumentCounterYes,intMonumentCounterNo){

      const data = {
        labels: ["Yes", "No"],
        datasets: [
          {
            label: 'Count',
            data: [intMonumentCounterYes,intMonumentCounterNo],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
          }
        ]
      };


      const ctx = document.getElementById('MonumentsChart');
        new Chart(ctx, {
          type: 'pie',
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Has National Monument?'
              }
            }
          },
        });

    }
})


