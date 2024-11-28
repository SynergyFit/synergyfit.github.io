async function tempo() {

    const parametros = new URLSearchParams({
        key:'0ac4d3d8775a46b9b8a123222242811',
        q:'São Paulo',
    })

    const url = `http://api.weatherapi.com/v1/current.json?${parametros}`;
    let api = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    })

    if (api.ok) {
        let resposta = await api.json()
        console.log(resposta)
        document.getElementById('temperatura').innerHTML = `${resposta.current.temp_c} C°`
        document.getElementById('image_clima').src = resposta.current.condition.icon
        document.getElementById('local').innerHTML = resposta.location.region
    }

    let resposta = await api.json()
    console.log(resposta)
    console.log('erro')

}

tempo()