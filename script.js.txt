document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    const searchQuery = document.getElementById('search-query').value;
    const apiKey = '87WMKJ5RVFN4W1KK'; // Replace with your Alpha Vantage API key
    const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data); // Implement this function to handle the display of results
        })
        .catch(error => console.error('Error:', error));
});

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Example: Display stock symbols and names
    data.bestMatches.forEach(stock => {
        const div = document.createElement('div');
        div.textContent = `${stock['1. symbol']} - ${stock['2. name']}`;
        resultsContainer.appendChild(div);
    });
}
