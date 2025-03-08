'user strict'


document.querySelector('#pesquisar').addEventListener('keydown',useApi);

async function getClima(cidade) {
    try{
        const key = `f5f785e6145944c2943145407250703`;
        const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${cidade}&aqi=no&`;
        const response = await fetch(url);
        if(response.status === 200){
            const data = await response.json();
            return data;
        }
    
    }catch(error){
        alert('an error occurred on the server.');
        
    }
}

async function useApi(evento){
    let inputCidade = document.querySelector('#pesquisar');

    if(inputCidade.value.trim() === ''){
        inputCidade.setAttribute('placeholder','you must inform a city');
    }

    if(evento.key === 'Enter'){
        let cidadeHtml = document.querySelector('#cidade');
        let paisHtml = document.querySelector('#pais');
        let clima = document.querySelector('#clima');
        let img = document.querySelector('#tempo-image');
        let temperatuaHtml = document.querySelector('#temperatura');
        let sensHtml = document.querySelector('#sens');
        let hunHtml = document.querySelector('#humi');
        let regiaoHtml = document.querySelector('#regiao');
        let nulo = 'none';

        const cidade = evento.target.value;
        const info = await getClima(cidade);
        console.log(info);
        
        nomeRegiao = info.location.region;
        if(nomeRegiao === ''){
            regiaoHtml.innerHTML = nulo;
        }else{
            regiaoHtml.innerHTML = nomeRegiao;
        }


        nomeCidade = info.location.name;
        cidadeHtml.innerHTML = nomeCidade;

        nomePais = info.location.country;
        paisHtml.innerHTML = nomePais;

        novoClima = info.current.condition.text;
        clima.innerHTML = novoClima;

        novoIcon = info.current.condition.icon;
        img.src = novoIcon;

        novaTemp = `${info.current.temp_c} °C`;
        temperatuaHtml.innerHTML = novaTemp;
        
        novaSens = `${info.current.feelslike_c} °C`;
        sensHtml.innerHTML=novaSens;

        novaHum = `${info.current.humidity} %`;
        hunHtml.innerHTML = novaHum;
    }
}

