document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchQuery = document.getElementById('search-query').value;
    document.getElementById('stock-symbol').textContent = `Stock Symbol: ${searchQuery}`;
    
    fetchStockPrice(searchQuery);
    fetchSMA(searchQuery);
});
document.getElementById('stock-symbol').textContent = `Stock Symbol: ${searchQuery}`;
    
    fetchStockPrice(searchQuery);
    fetchSMA(searchQuery);

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

function fetchStockPrice(symbol) {
    const apiKey = 'YOUR_API_KEY'; // Replace this with your Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const price = data['Global Quote']['05. price'];
            document.getElementById('stock-price').textContent = `Stock Price: ${price}`;
        })
        .catch(error => console.error('Error:', error));
}

function fetchSMA(symbol) {
    const apiKey = 'YOUR_API_KEY'; // Replace this with your Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=10&series_type=close&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const smaData = data['Technical Analysis: SMA'];
            const latestSMA = smaData[Object.keys(smaData)[0]]['SMA'];
            document.getElementById('stock-sma').textContent = `10-Day SMA: ${latestSMA}`;
        })
        .catch(error => console.error('Error:', error));
}

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
