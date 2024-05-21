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