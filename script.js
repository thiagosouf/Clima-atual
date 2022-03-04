const kelvin = 273.15;
let latitude, longitude

getLocation()

function acionarPesquisa(){
        obterInfosDaAPI();
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Não é possivel verificar Localização");
    }
  }


  
  function showPosition(position) {
    latitude = position.coords.latitude 
    longitude = position.coords.longitude;
  }

  function acionarPesquisaManual(){
    latitude=document.querySelector(".latitude").value;
    longitude=document.querySelector(".longitude").value;
    if (latitude !== "" && longitude !== ""){
        obterInfosDaAPI()
    }
}

function obterInfosDaAPI(){
    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ea18f1bc5e69817a023e1727ebe2cb52`)
    console.log(promise)
    promise.then(renderizarCard)
    promise.catch(exibirErro)
}

function renderizarCard(resposta){
    console.log(resposta.data)
    const respostaAPI = resposta.data
    const ul = document.querySelector("ul");
    ul.querySelector(".temperatura").innerHTML = (respostaAPI.main.temp - kelvin).toFixed(2) + " ºC";
    ul.querySelector(".sensacao").innerHTML = (respostaAPI.main.feels_like- kelvin).toFixed(2) + " ºC";;
    ul.querySelector(".minima").innerHTML = (respostaAPI.main.temp_min- kelvin).toFixed(2) + " ºC";;
    ul.querySelector(".maxima").innerHTML = (respostaAPI.main.temp_max- kelvin).toFixed(2) + " ºC";;
    document.querySelector("img").setAttribute("src", `http://openweathermap.org/img/wn/${respostaAPI.weather[0].icon}@2x.png`);
}

function exibirErro(erro){
    alert(`Erro: ${erro.response.status}`)
    alert("Não é possivel localizar sua região!")

}