document.addEventListener("DOMContentLoaded", async function () {

  countries = await fetchCountryData();

  if (!Array.isArray(countries)) {                                /// 1. sprawdz czy [countreis] jest listą
    console.error("Error: 'countries' is not an array");
    return;
  }

  

  if (countries.length === 0) {
    console.warn('Warning: "Countries" is an empty list');       /// 2. sprawdź czy zawiera jakieś elementy czy jest pusta
    return;
  }

                  
 
  /// jeżeli jest nie pustą listą to możesz wykonać to co poniżej



  console.log(countries);

  // ..2

  console.log(countries.length)
  console.log(countries[1].hasMonument)

  const dataContainer = document.getElementById('data-container');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  countries.forEach(item => {
    const row = document.createElement('tr');

    Object.values(item).forEach(value => {
      const td = document.createElement('td');

      td.textContent = value;
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  dataContainer.appendChild(table);

  // ..2 

  ////////////////////////////////////////////////////

  //fetchData();

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
      const arrCountryPopulation = [];

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
        arrCountryPopulation[i][0] = item["country_name"];
        arrCountryPopulation[i][1] = item["population"];


        Object.values(item).forEach(value => {
          const td = document.createElement('td');
          let tmp = value;

          if (typeof tmp === "boolean") {
            if (tmp == true) tmp = 'Tak'
            else tmp = 'Nie'
          }

          td.textContent = tmp;
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
  function CreatechartCoutryPopulation(arrCountryPopulation) {

    const countries = [];
    const population = [];

    arrCountryPopulation.sort(SortPopulation);

    function SortPopulation(a, b) {
      return b[1] - a[1]
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

function fetchCountryData() {
  const apiKey = 'a90a3a10';
  const apiUrl = `https://my.api.mockaroo.com/country_api.json?key=${apiKey}`;


  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => dataHandler(data))
    .catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    });
  // .catch(error => console.error('Error fetching data:', error));
}

function dataHandler(data) {
  countries = [];

  data.forEach(e => {
    let tmp = new CountryData(
      e["id"],
      e["country_name"],
      e["popular_city"],
      e["population"],
      e["has_national_monument"],
      e["country_code"],
      e["gained_independence"],
    );

    countries.push(tmp)
  });

  return countries;
}

class CountryData {
  constructor(id, name, city, population, hasMonument, countryCode, indepDate) {
    this.id = id
    this.name = name
    this.city = city
    this.population = population
    this.hasMonument = hasMonument == true ? 'Tak' : 'Nie'
    this.countryCode = countryCode
    this.indepDate = indepDate
  }
}