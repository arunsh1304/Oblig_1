let lastFetchedId = 0; 

function homepage() {

    lastFetchedId = 0; 
    window.removeEventListener('scroll', handleScroll);

}

function fetchdata() {

    const limit = 9;
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((posts) => {
            let container = document.getElementById("main-container");

            let count = 0;
            for (let post of posts) {
                if (post.id > lastFetchedId && count < limit) {
                    const article = document.createElement("article");
                    const title = document.createElement("h1");
                    title.textContent = post.title;
                    const body = document.createElement("p");
                    body.textContent = post.body;
                    article.appendChild(title);
                    article.appendChild(body);
                    container.appendChild(article);

                    lastFetchedId = post.id; 
                    count++;
                }
            }
        });


    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {

    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
    fetchdata();
    }

}

function fetchweather() {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = '';

    const url1 = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true';
    const url2 = 'https://api.open-meteo.com/v1/forecast?latitude=59.9139&longitude=10.7522&current_weather=true';
    const url3 = 'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true';
    const url4 = 'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=74.0060&current_weather=true';
    const url5 = 'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=0.1278&current_weather=true';


    let locations = [
        { name: "Tokyo", url: url1 },
        { name: "Oslo", url: url2 },
        { name: "Paris", url: url3 },
        { name: "New york", url: url4 },
        { name: "London", url: url5 }
    ];

    for (let location of locations) {
    
        fetch(location.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const currentWeather = data.current_weather;
                const temperature = currentWeather.temperature;
                const windSpeed = currentWeather.windspeed;
                const windDirection = currentWeather.winddirection;
                const time = currentWeather.time;

                weatherDiv.innerHTML += `
                    <h3>${location.name}<h3>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Wind Speed: ${windSpeed} km/h</p>
                    <p>Wind Direction: ${windDirection}°</p>
                    <br>
                `;
            })

    }
    
}

setInterval(fetchweather, 15000);