document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchQuery = document.getElementById('search-query').value;
    document.getElementById('stock-symbol').textContent = `Stock Symbol: ${searchQuery}`;
    
    // Call the functions to fetch stock price and SMA using the input symbol
    fetchStockPrice(searchQuery);
    fetchSMA(searchQuery);
});

function fetchStockPrice(symbol) {
    const apiKey = '87WMKJ5RVFN4W1KK'; // Your Alpha Vantage API key
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
    const apiKey = '87WMKJ5RVFN4W1KK'; // Your Alpha Vantage API key
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
