const url = "https://go-wash-api.onrender.com/api/login";

async function login() {

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    let resultado = document.getElementById('resposta')

    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "user_type_id": 1,
            "password": senha,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (api.ok) {
        let resposta = await api.json();
        localStorage.setItem('user', JSON.stringify(resposta))
        console.log(resposta)

        resultado.innerHTML = 'Logado com sucesso'
        resultado.style.color = 'green'

        setTimeout(() => window.location.href = 'home.html', 3000);
        return
    }

    let respostaErro = await api.json();
    console.log(respostaErro)
    resultado.innerHTML = respostaErro.data.errors
    resultado.style.color = 'red'
}

document.getElementById('botao').addEventListener('click', login)