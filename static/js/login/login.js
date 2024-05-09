const changeScreen = document.getElementById("criarConta");
const formulario = document.getElementById("login-form");
const campos = document.getElementById("campos");
const options = document.querySelector(".cadastro");
const side = document.getElementById("side");

changeScreen.addEventListener("click",function(){
    campos.remove();
    options.remove();
    formulario.classList.add("cadastro-form");
    side.classList.add("sideCadastro");

    const containerCampos = document.createElement("form");

    const apresentacao = document.createElement("div");
    apresentacao.classList.add("apresentacao");
    const imagem = document.createElement("img");
    imagem.src = "static\\js\\login\\img\\codigo.png";
    imagem.style.width = "15%";
    const fraseCadastro = document.createElement("h1");
    fraseCadastro.textContent = "Cadastre-se";
    apresentacao.appendChild(imagem);
    apresentacao.appendChild(fraseCadastro);

    const quebraLinha1 = document.createElement("br");
    const quebraLinha2 = document.createElement("br");
    const quebraLinha3 = document.createElement("br");

    const labUser = document.createElement("label");
    labUser.textContent = "Nome Completo";
    labUser.setAttribute("for","user");
    const labEmail = document.createElement("label");
    labEmail.textContent = "Email";
    labEmail.setAttribute("for","email");
    const labSenha = document.createElement("label");
    labSenha.textContent = "Senha";
    labSenha.setAttribute("for","senha");
    const user = document.createElement("input");
    user.id="user";
    const email = document.createElement("input");
    email.id="email";
    const senha = document.createElement("input");
    senha.id="senha";
    const cadastrarButton = document.createElement("button");
    cadastrarButton.textContent = "Cadastrar";
    const validaSenha = document.createElement("p");
    validaSenha.textContent = "";

    const containerOption = document.createElement("div");
    containerOption.classList.add("cadastro");
    const fraseJaTemConta = document.createElement("p");
    const logar = document.createElement("a");
    fraseJaTemConta.textContent = "Já tem conta? |";
    logar.textContent = " Entrar";
    fraseJaTemConta.appendChild(logar);
    containerOption.appendChild(fraseJaTemConta);

    containerCampos.appendChild(apresentacao);
    containerCampos.appendChild(labUser);
    containerCampos.appendChild(user);
    containerCampos.appendChild(quebraLinha1);
    containerCampos.appendChild(labEmail);
    containerCampos.appendChild(email);
    containerCampos.appendChild(quebraLinha2);
    containerCampos.appendChild(labSenha);
    containerCampos.appendChild(senha);
    containerCampos.appendChild(quebraLinha3);
    containerCampos.appendChild(validaSenha);
    containerCampos.appendChild(cadastrarButton);

    formulario.appendChild(containerCampos);
    formulario.appendChild(containerOption);
})