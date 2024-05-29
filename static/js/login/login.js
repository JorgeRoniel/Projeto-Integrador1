const mudarParaCadastro = document.getElementById("criarConta");
const side = document.getElementById("side");
const container = document.getElementById("formularioCampos");
const cadastroScreen = document.getElementById("cadastro-form");
const loginScreen = document.getElementById("campos");
const naoTemConta = document.getElementById("naoTemConta");
const mudarParaLogin = document.getElementById("logar");
const jaTemConta = document.getElementById("jaTemConta");
const mensagemVerificaSenha = document.getElementById("textLogin");
const mensagemVerificaCadastro = document.getElementById("textSigin");

cadastroScreen.remove();
jaTemConta.remove();

mudarParaCadastro.addEventListener("click", function(){
    mensagemVerificaSenha.textContent="";
    loginScreen.remove();
    naoTemConta.remove();
    container.classList.add("formMoveLeft");
    container.appendChild(cadastroScreen);
    container.appendChild(jaTemConta);
    side.classList.add("sideMoveRight");
});

mudarParaLogin.addEventListener("click",function(){
    cadastroScreen.remove();
    jaTemConta.remove();
    container.classList.remove("formMoveLeft");
    container.appendChild(loginScreen);
    container.appendChild(naoTemConta);
    side.classList.remove("sideMoveRight");
});

const check = () =>{
    const user = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    if(user === "nelson" && senha==="123"){
        alert("login bem sucedido");
    }
    else{
        mensagemVerificaSenha.textContent = "Usuário e/ou senha inválidos";
    }
}

const cadastrar = () =>{
    const nome = document.getElementById("nomeCriar").value;
    const user = document.getElementById("usuarioCriar").value;
    const senha = document.getElementById("senhaCriar").value;
    if(nome.length === 0 || user.length === 0 || senha.length === 0){
        mensagemVerificaCadastro.textContent = "Todos os campos devem ser preenchidos";
    }
}

loginScreen.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(loginScreen);
    const data ={};
    formData.forEach((value, key) => {
        data[key] = value;
    })

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    fetch('/submit', options)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.href = "/teste"
            } else {
                alert('Usuario ou senha incorretas!')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})

cadastroScreen.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(cadastroScreen)
    const data = {}

    formData.forEach((value, key) => {
        data[key] = value
    })

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    fetch('/create', options)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success'){
                alert(data.message)
                window.location.href = 'templates\\home.html'
            }else{
                alert('error!')
            }
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
})