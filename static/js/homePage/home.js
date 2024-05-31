const contaOpcoes = document.getElementById("contaOpcoes");
const opcoes = document.getElementById('OpcoesExpandidas');
const btn_logout = document.getElementById('logout');

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