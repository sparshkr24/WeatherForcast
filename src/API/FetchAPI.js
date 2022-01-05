function getCityData(cityName){
    let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4e8c836b9b43812298f8072d0f03b008`
    const cityData = fetch(cityUrl).then((response) => response.json()).catch((error) => console.log(error))
    return cityData;
}
const FetchAPI = async(city) => {
    

    const cityData = await getCityData(city)
    .then((response) => {
        // console.log(response)
        return response
    })
    .catch((error) => console.log(error))

    // console.log("city",cityData);
    if(cityData.hasOwnProperty("message")){
        // means Entered City Does not Exits
        // console.log(Promise.reject(cityData)) 
        return Promise.reject(cityData)
    }
    // let url= `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8979967718614d604f65ad9ea263692d`
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}&exclude=minutely&units=metric&appid=4e8c836b9b43812298f8072d0f03b008`;
    const data = fetch(url).then((response) => response.json()).catch((error) => console.log(error))
    // console.log("data",data);

    return data
}

export default FetchAPI
