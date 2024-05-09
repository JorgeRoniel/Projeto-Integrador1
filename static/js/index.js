var nome=document.getElementById("usuario");
var senha=document.getElementById("senha");
var checkLogin=document.getElementById("textLogin");
var cadastro=document.getElementById("cadastro");
var login=document.getElementById("entrar");
var acao=document.getElementById("TextAcao");
var ladoDir=document.getElementById("sideRight");

const InputEmail=()=>{
    var email = document.createElement('input'); // Cria um novo elemento input
    email.setAttribute('type', 'text'); // Define o tipo do novo input
    email.setAttribute('placeholder', 'E-mail'); // Define o placeholder do novo input
    email.setAttribute('id','email');

    var senhaInput = document.getElementById('senha'); 
    var container = senhaInput.parentNode;

    container.insertBefore(email, senhaInput);

    email.style.width="90%";
}

const ButtonSigin=()=>{
    var BotaoCriarConta = document.createElement('button'); // Cria um novo elemento input
    BotaoCriarConta.setAttribute('type', 'button'); // Define o tipo do novo input
    BotaoCriarConta.setAttribute('id','criaConta');
    BotaoCriarConta.textContent="Criar conta";
    containerBotao=cadastro.parentNode;
    containerBotao.insertBefore(BotaoCriarConta,cadastro);

    BotaoCriarConta.style.marginLeft="0";
    BotaoCriarConta.style.marginTop="0";
    BotaoCriarConta.style.transform="-50%,-50%";
}

function sigin() {
    var form = document.getElementById('loginForm');
    form.classList.toggle('moved');

    nome.style.width="90%";
    senha.style.width="90%";
    checkLogin.textContent="";

    InputEmail();
    ButtonSigin();

    cadastro.remove();
    login.remove();
    acao.textContent="Cadastre-se";
    ladoDir.style.display="none";
    
}

const check=()=>{
    if(nome.value==="nelson" && senha.value==="123"){
        alert("Bem vindo");
    }
    else{
        checkLogin.textContent="Senha incorreta";
    }
}