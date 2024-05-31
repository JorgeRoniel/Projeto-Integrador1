const contaOpcoes = document.getElementById("contaOpcoes");
const opcoes = document.getElementById('OpcoesExpandidas');
const btn_logout = document.getElementById('logout');
const maratonas = document.getElementById('maratonas');
const competicoes = document.getElementById('competicoes');
const times = document.getElementById('times');
const underline = document.getElementById('underline');
const containerBotaoCompeticoes = document.getElementById('containerBotaoCompeticoes');
const containerBotaoMaratonas = document.getElementById('containerBotaoMaratonas');
const containerBotaoTimes = document.getElementById('containerBotaoTimes');

var checkExpansive = false; 

contaOpcoes.addEventListener('click',function(){
    if(checkExpansive === false){
        opcoes.style.display="flex";
        checkExpansive=true;
    }
    else{
        opcoes.style.display="none";
        checkExpansive = false;
    }
})

btn_logout.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('/logout', {method: 'GET'})
        window.location.href = '/'
})

maratonas.addEventListener('click',function(){
    containerBotaoMaratonas.appendChild(underline);
})


competicoes.addEventListener('click',function(){
    containerBotaoCompeticoes.appendChild(underline);
})

times.addEventListener('click',function(){
    containerBotaoTimes.appendChild(underline);
})


