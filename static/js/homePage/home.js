const contaOpcoes = document.getElementById("contaOpcoes");
const opcoes = document.getElementById('OpcoesExpandidas');
const criarMaisButton = document.getElementById("criarMaisButton");
const btn_logout = document.getElementById('logout');
const maratonas = document.getElementById('maratonas');
const partidas = document.getElementById('partidas');
const times = document.getElementById('times');
const maratonasCreation = document.getElementById('maratonasCreation');
const partidasCreation = document.getElementById('partidasCreation');
const timesCreation = document.getElementById('timesCreation');
const underline = document.getElementById('underline');
const underlineCreation = document.getElementById("underlineCreation");
const containerBotaopartidas = document.getElementById('containerBotaopartidas');
const containerBotaoMaratonas = document.getElementById('containerBotaoMaratonas');
const containerBotaoTimes = document.getElementById('containerBotaoTimes');
const containerBotaopartidasCreation = document.getElementById('containerBotaopartidasCreation');
const containerBotaoMaratonasCreation = document.getElementById("containerBotaoMaratonasCreation");
const containerBotaoTimesCreation = document.getElementById('containerBotaoTimesCreation');
const criacao = document.getElementById("criacao");
const fecharCriacao = document.getElementById("fecharCriacao");
const criarMaratona = document.getElementById("criarMaratona");
const criarTime = document.getElementById("criarTime");
const criarPartida = document.getElementById("criarPartida");
const formMaratona = document.getElementById("criar-maratona-form");

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

fecharCriacao.addEventListener('click',function(){
    criacao.style.display = "none";
})

criarMaisButton.addEventListener('click',function(){
    criacao.style.display = "flex";
})

btn_logout.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('/logout', {method: 'GET'})
        window.location.href = '/'
})

maratonas.addEventListener('click', function(event){
    containerBotaoMaratonas.appendChild(underline);

    const options = {
        method: 'GET'
    }

    fetch('/maratonas', options)
        .then(response => response.json())
        .then(data => {
            console.log('Maratonas:', data); 

            const maratonasContainer = document.getElementById('listarMaratonas');
            maratonasContainer.innerHTML = ''; 

            data.forEach(maratona => {
                const maratonaDiv = document.createElement('div');
                maratonaDiv.classList.add('maratona');

                maratonaDiv.innerHTML = `
                    <h3>${maratona.nome_maratona}</h3>
                    <p>Descrição: ${maratona.descricao}</p>
                    <p>Quantidade de Times: ${maratona.qtdTimes}</p>
                    <p>Premiação: ${maratona.premiacao}</p>
                `;

                maratonasContainer.appendChild(maratonaDiv);
            });
        })
        .catch((error) => {
            console.error('ERRO: ', error);
        });
});


partidas.addEventListener('click',function(){
    containerBotaopartidas.appendChild(underline);
})

times.addEventListener('click',function(){
    containerBotaoTimes.appendChild(underline);
})

maratonasCreation.addEventListener('click',function(){
    containerBotaoMaratonasCreation.appendChild(underlineCreation);
    criarMaratona.style.display = "flex";
    criarPartida.style.display = "none";
    criarTime.style.display = "none";
})


partidasCreation.addEventListener('click',function(){
    containerBotaopartidasCreation.appendChild(underlineCreation);
    criarMaratona.style.display = "none";
    criarPartida.style.display = "flex";
    criarTime.style.display = "none";
})

timesCreation.addEventListener('click',function(){
    containerBotaoTimesCreation.appendChild(underlineCreation);
    criarMaratona.style.display = "none";
    criarPartida.style.display = "none";
    criarTime.style.display = "flex";
})

formMaratona.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formMaratona);
    data = {}

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

    fetch('/createMarathon', options)
        .then(response => response.json())
        .then(data => {
            if(data.status === "success"){
                alert(data.message);
            }else{
                if(data.status === "error"){
                    alert("erro ao criar maratona");
                }else if(data.status == "N/A"){
                    alert(data.message);
                }
            }
        })
        .catch((error) => {
            console.log("Erro: ", error);
        });
});

