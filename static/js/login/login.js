const mudarParaCadastro = document.getElementById("criarConta");
const side = document.getElementById("side");
const container = document.getElementById("formularioCampos");
const cadastroScreen = document.getElementById("cadastro-form");
const loginScreen = document.getElementById("campos");
const naoTemConta = document.getElementById("naoTemConta");
const mudarParaLogin = document.getElementById("logar");
const jaTemConta = document.getElementById("jaTemConta");
const mensagemVerificaSenha = document.getElementById("textLogin");

cadastroScreen.remove();
jaTemConta.remove();

mudarParaCadastro.addEventListener("click", function(){
    mensagemVerificaSenha.textContent="";
    loginScreen.remove();
    naoTemConta.remove();
    container.classList.add("formMoveLeft");
    container.appendChild(cadastroScreen);
    container.appendChild(jaTemConta);
    side.classList.add("sideMoveLeft");
});

mudarParaLogin.addEventListener("click",function(){
    cadastroScreen.remove();
    jaTemConta.remove();
    container.classList.remove("formMoveLeft");
    container.appendChild(loginScreen);
    container.appendChild(naoTemConta);
    side.classList.remove("sideMoveLeft");
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