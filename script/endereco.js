try {
    let dados = JSON.parse(localStorage.user);
    if(dados) {
        document.getElementById('form').style.display = 'flex'
        document.getElementById('deslogado').style.display = 'none'
        document.getElementById('paragrafo').innerHTML = `Olá ${dados.user.name}!<br>Agora, faça seu cadastro de endereço!`
        document.getElementById('paragrafo_2').style.display = 'none'
    }
} catch {
    document.getElementById('form').style.display = 'none'
    document.getElementById('deslogado').style.display = 'block'
    document.getElementById('paragrafo').innerHTML = 'Apenas clientes podem cadastrar endereço'
    document.getElementById('paragrafo_2').display = 'block'
    document.getElementById('paragrafo_2').innerHTML = 'Se você ja for aluno, <span><a href="login.html">faça seu login!</a></span>'
}

const url = 'https://go-wash-api.onrender.com/api/auth/address'

async function cadastroEndereco() {

    let user = JSON.parse(localStorage.getItem('user'))

    let resultado = document.getElementById('resultado')
    let titulo = document.getElementById('titulo').value
    let cep = document.getElementById('cep').value
    let endereco = document.getElementById('endereco').value
    let numero = document.getElementById('numero').value
    let complemento = document.getElementById('complemento').value

    if (!titulo || !cep || !endereco || !numero || !complemento) {
        resultado.innerHTML = 'Preencha todos os campos!'
        resultado.style.color = 'red'
        return
    }


    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "title":titulo,
            "cep": cep,
            "address": endereco,
            "number": numero,
            "complement": complemento
        }
        ),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access_token}`
        }
    });

    if (api.ok) {
        let resposta = await api.json();
        resultado.innerHTML = 'Endereço cadastrado :)'
        resultado.style.color = 'green'
        console.log(resposta)
        localStorage.setItem('endereco', JSON.stringify(resposta))
        setTimeout(() => window.location.href = 'home.html', 3000)
        return
    }
    let respostaErro = await api.json();
    resultado.innerHTML = `Não cadastrado :(<br>${respostaErro}`
    resultado.style.color = 'red'
}

document.getElementById('botao').addEventListener('click', cadastroEndereco)