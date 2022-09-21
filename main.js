const URL = "https://restcountries.com/v3.1/"

const setQuery = (e) => {
    if(e.keyCode == "13")
    getResult(searchBar.value)
}

const getResult = (countryName) => {
    let query = `${URL}name/${countryName}?fullText=true`
    fetch(query)
    .then(response =>{
        return response.json()
    })
    .then(displayResult)
    .catch(() => {
        if ((countryName).length == 0) {
            let error = document.querySelector("#error")
            error.innerHTML = `<small>The input field cannot be empty<small>`
        }else{
            let error = document.querySelector("#error")
            error.innerHTML = `Please enter a valid country name.`
        }
      });
}

const displayResult = (result) => {
    let error = document.querySelector("#error")
    error.innerHTML = ``
    let city = document.querySelector("#city")
    city.innerHTML = `Country: ${result[0].name.common}`

    let temp = document.querySelector("#temp")
    temp.innerHTML = `Capital: ${result[0].capital[0]}`

    let desc = document.querySelector("#desc")
    desc.innerHTML = `Continent: ${result[0].continents[0]}</br> Currency: ${
        result[0].currencies[Object.keys(result[0].currencies)].name
      } - ${Object.keys(result[0].currencies)[0]} </br>
      Languages : ${Object.values(result[0].languages)
        .toString()
        .split(",")
        .join(", ")} </br>Population: ${result[0].population}`

    let minmax = document.querySelector("#flag")
    minmax.innerHTML = `<img src="${result[0].flags.svg}" class="img-fluid">`

}

let searchBar = document.getElementById("searchBar")
searchBar.addEventListener("keypress",setQuery)