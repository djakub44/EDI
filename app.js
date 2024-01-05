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
                
                //DJ populating arrays for charts
                arrCountryPopulation[i] = []
                arrCountryPopulation[i][0]=item["country_name"];
                arrCountryPopulation[i][1]=item["population"];
                
                
                Object.values(item).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);  
                });

                i = i + 1;
                tbody.appendChild(row);
            });
            //console.log(arrCountryPopulation[0][0])
            table.appendChild(tbody);

            
            dataContainer.appendChild(table);

            //DJ create a chart
            CreatechartCoutryPopulation(arrCountryPopulation); 

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
            console.log(countries[i])
            console.log(population[i])
        };

        const ctx = document.getElementById('CountryPopulationChart');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: countries,
            datasets: [{
              label: 'Top 10 Countries by Population',
              data: population,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
    }
})


