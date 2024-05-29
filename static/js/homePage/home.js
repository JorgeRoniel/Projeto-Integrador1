const contaOpcoes = document.getElementById("contaOpcoes");
const opcoes = document.getElementById('OpcoesExpandidas');

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