async function atualizar_endereco() {

    document.getElementById('resultado').style.color = 'black';
    document.getElementById('resultado').innerHTML = 'Processando...';

    let titulo, cep, address, numero, complemento
    titulo = document.getElementById('titulo').value
    cep = document.getElementById('cep').value
    address = document.getElementById('endereco').value
    numero = document.getElementById('numero').value
    complemento = document.getElementById('complemento').value

    if (!titulo || !cep || !endereco || !numero) {
        resultado.innerHTML = 'Preencha os campos!'
        resultado.style.color = 'red'
        return
    }

    let user = JSON.parse(localStorage.getItem('user'))

    const url_parametro = new URLSearchParams(window.location.search);
    const id = url_parametro.get('id');
    
    let url = `https://go-wash-api.onrender.com/api/auth/address/${id}`

    let api_atualizar = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "title": titulo,
            "cep": cep,
            "address": address,
            "number": numero,
            "complement": complemento
        }
        ),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access_token}`
        }
    });

    if (api_atualizar.ok) {
        let resposta = await api_atualizar.json();
        document.getElementById('resultado').style.color = 'green';
        document.getElementById('resultado').innerHTML = 'Endereço atualizado com sucesso!';
        console.log(resposta);

        setTimeout(() => window.location.href = '../view/endereco.html', 3000)
        return
    }

    let respostaErro = await api_atualizar.json();
    console.log(respostaErro);
    document.getElementById('resultado').style.color = 'red';
    document.getElementById('resultado').innerHTML = 'Erro :(';
}

////////////////////////////////////////////

async function pegar_endereco() { 

    let user = JSON.parse(localStorage.getItem('user'))

    let url_listagem = 'https://go-wash-api.onrender.com/api/auth/address'

    let api_listagem = await fetch(url_listagem, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access_token}`
        }
    });


    if (api_listagem.ok) {
        let resposta = await api_listagem.json();

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        resposta.data.forEach(endereco => {

            if(endereco.id == id) { 
                document.getElementById('paragrafo_endereco_atualizado').innerHTML = `Atualizar ${endereco.title}`
            }

            return id

        });

        if(resposta.data.length == 0) {
            console.log( 'Nenhum endereço cadastrado')
            return
        }

    }
    
}

pegar_endereco()

document.getElementById('botao').addEventListener('click', atualizar_endereco)