let input = document.getElementById('search');
let suggestion = document.getElementById('suggestions');

(async () => {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    let response = await fetch(endpoint);
    let data = await response.json();

    input.addEventListener('input', function(event) {
        let field = event.target;

        let filteredData = data.filter(function(item) {
            let city = item.city.toLowerCase();
            let state = item.state.toLowerCase();
            let keyword = field.value.toLowerCase();

            if(city.includes(keyword) || state.includes(keyword)) {
                return item;
            }
        });

        generateSuggestions(filteredData, field.value);
    });
})()

function generateSuggestions(data, keyword) {
    suggestion.innerHTML = '';

    for(let item of data) {
        let div = document.createElement('div');
        let li = document.createElement('li');
        div.innerHTML = highlighter(item.city, keyword) + ', ' + highlighter(item.state, keyword);
        li.append(div);
        let span = document.createElement('span');
        span.classList.add('population');
        span.textContent = item.population;
        li.append(span);
        suggestion.append(li);
    }
}

function highlighter(text, key) {
    return text.replace(key, `<span class="hl">${key}</span>`);
}