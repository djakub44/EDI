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

            Object.keys(data[0]).forEach(key => {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            
            const tbody = document.createElement('tbody');

            data.forEach(item => {
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
        } else {

            dataContainer.textContent = 'No data available.';
        }
    }
})


