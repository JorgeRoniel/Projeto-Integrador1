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

if(window.innerWidth <=768){
    cadastroScreen.style.transform = "rotateY(180deg)";
    jaTemConta.style.transform = "rotateY(180deg)";
}

mudarParaCadastro.addEventListener("click", function(){
    mensagemVerificaSenha.textContent="";
    loginScreen.remove();
    naoTemConta.remove();
    if(window.innerWidth>768){
        container.classList.add("formMoveLeft");
    }
    else{
        container.classList.add("formMoveLeftMobile");
    }
    container.appendChild(cadastroScreen);
    container.appendChild(jaTemConta);
    side.classList.add("sideMoveRight");
});

mudarParaLogin.addEventListener("click",function(){
    cadastroScreen.remove();
    jaTemConta.remove();
    if(window.innerWidth > 768){
        container.classList.remove("formMoveLeft");
    }
    else{
        container.classList.remove("formMoveLeftMobile");
    }
    container.appendChild(loginScreen);
    container.appendChild(naoTemConta);
    side.classList.remove("sideMoveRight");
});

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
                window.location.href = "/home"
            } else {
                alert('error');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})

cadastroScreen.addEventListener('submit', (event) => {
    event.preventDefault()

    const nome = document.getElementById("nomeCriar").value;
    const user = document.getElementById("usuarioCriar").value;
    const senha = document.getElementById("senhaCriar").value;
    const formData = new FormData(cadastroScreen)
    const data = {}

    if(nome.length === 0 || user.length === 0 || senha.length === 0){
        mensagemVerificaCadastro.textContent = "Todos os campos devem ser preenchidos";
        return;
    }

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
                window.location.href = '/'
            }else{
                mensagemVerificaCadastro.textContent = "Erro ao cadastrar";
            }
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
})