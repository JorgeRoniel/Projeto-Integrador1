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
const exibirCategorias = document.getElementById("ExibirCategorias");
const filter = document.getElementById("filter");

const underline = document.createElement('hr');
underline.classList.add("horizontal-bar");
underline.style.marginTop = "0";
underline.style.marginBottom = "0";
underline.style.width = "100%";
underline.style.height = "2px";

//Variaveis que dirão qual está sendo exibido na tela na hora de filtrar
var getMaratona = false;
var getTimes = false;
var getPartidas = false;

//Checa se a caixa de logout está expandida ou não
var checkExpansive = false;

//Vetores que guardarão in memory os gets para tornar o programa performático
var maratonasSalvas = [];
var timesSalvos = [];
var partidasSalvas = [];

//Variáveis que contarão a quantidade de inserts para checar se faz a consulta ou não
var countInsertMaratona = 0;
var countInsertTimes = 0;
var countInsertSalvos = 0;

contaOpcoes.addEventListener('click', function () {
    if (checkExpansive === false) {
        opcoes.style.display = "flex";
        checkExpansive = true;
    }
    else {
        opcoes.style.display = "none";
        checkExpansive = false;
    }
})

fecharCriacao.addEventListener('click', function () {
    criacao.style.display = "none";
})

criarMaisButton.addEventListener('click', function () {
    criacao.style.display = "flex";
})

btn_logout.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('/logout', { method: 'GET' })
    window.location.href = '/'
})

maratonas.addEventListener('click', async function (event) {
    getMaratona = true;
    getTimes = false;
    getPartidas = false;
    filter.value = '';

    exibirCategorias.innerHTML = '';
    containerBotaoMaratonas.appendChild(underline);

    //Se a quantidade de inserts for maior que a quantidade de maratonas salvas, então ele deve realizar a consulta, pq há insert novo
    //Se o vetor de maratoans salvas tiver tamanho 0, significa que nenhuma consulta foi feita ainda, então precisa consultar.
    if (countInsertMaratona > maratonasSalvas.length || maratonasSalvas.length === 0) {
        const options = {
            method: 'GET'
        }
        const maratonasSalvasBackup = maratonasSalvas; //Cria um vetor auxiliar para backup caso a consulta falhe
        maratonasSalvas = []; //Esvazia o vetor original para evitar duplicidade de itens
        await fetch('/maratonas', options)
            .then(response => response.json())
            .then(data => {
                console.log('Maratonas:', data);

                data.forEach(maratona => {
                    const maratonasObj = {
                        nome: maratona.nome_maratona,
                        descricao: maratona.descricao,
                        qtdTimes: maratona.qtdTimes,
                        premiacao: maratona.premiacao,
                    }

                    maratonasSalvas.push(maratonasObj);
                });
            })
            .catch((error) => {
                maratonasSalvas = maratonasSalvasBackup;
                console.error('ERRO: ', error);
            });
        //Se o countInsertMaratona for = 0, na maioria dos casos, significará que é a primeira consulta,
        //então é atribuído a ele o tamanho do vetor para a comparação funcionar corretamente.
        countInsertMaratona = countInsertMaratona === 0 ? maratonasSalvas.length : countInsertMaratona;
    }
    maratonasSalvas.forEach(element => {
        const containerItem = document.createElement('li');
        const linhaDivisoria = document.createElement('hr');
        linhaDivisoria.classList.add("horizontal-bar");
        linhaDivisoria.style.marginTop = "0";
        linhaDivisoria.style.marginBottom = "0";
        linhaDivisoria.style.width = "100%";
        linhaDivisoria.style.height = "2px";
        containerItem.innerHTML = `
            // <h3>${element.nome}</h3>
            // <p>Descrição: ${element.descricao}</p>
            // <p>Quantidade de Times: ${element.qtdTimes}</p>
            // <p>Premiação: ${element.premiacao}</p>
            // `;
        exibirCategorias.appendChild(containerItem);
        exibirCategorias.appendChild(linhaDivisoria);
    });
});


partidas.addEventListener('click', function () {
    getMaratona = false;
    getTimes = false;
    getPartidas = true;
    containerBotaopartidas.appendChild(underline);
    exibirCategorias.innerHTML = '';
})

times.addEventListener('click', function () {
    getMaratona = false;
    getTimes = true;
    getPartidas = false;
    containerBotaoTimes.appendChild(underline);
    exibirCategorias.innerHTML = '';
})

maratonasCreation.addEventListener('click', function () {
    containerBotaoMaratonasCreation.appendChild(underlineCreation);
    criarMaratona.style.display = "flex";
    criarPartida.style.display = "none";
    criarTime.style.display = "none";
})


partidasCreation.addEventListener('click', function () {
    containerBotaopartidasCreation.appendChild(underlineCreation);
    criarMaratona.style.display = "none";
    criarPartida.style.display = "flex";
    criarTime.style.display = "none";
})

timesCreation.addEventListener('click', function () {
    containerBotaoTimesCreation.appendChild(underlineCreation);
    criarMaratona.style.display = "none";
    criarPartida.style.display = "none";
    criarTime.style.display = "flex";
})

formMaratona.addEventListener('submit', async function (event) {
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

    await fetch('/createMarathon', options)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                countInsertMaratona += 1;
                alert(data.message);
            } else {
                if (data.status === "error") {
                    alert("erro ao criar maratona");
                } else if (data.status == "N/A") {
                    alert(data.message);
                }
            }
        })
        .catch((error) => {
            console.log("Erro: ", error);
        });
});

filter.addEventListener("input", function (event) {
    exibirCategorias.innerHTML = '';
    if (getMaratona) {
        maratonasSalvas.forEach(element => {
            if (element.nome.toLowerCase().includes(event.target.value.toLowerCase())) {
                const containerItem = document.createElement('li');
                const linhaDivisoria = document.createElement('hr');
                linhaDivisoria.classList.add("horizontal-bar");
                linhaDivisoria.style.marginTop = "0";
                linhaDivisoria.style.marginBottom = "0";
                linhaDivisoria.style.width = "100%";
                linhaDivisoria.style.height = "2px";
                containerItem.innerHTML = `
                    // <h3>${element.nome}</h3>
                    // <p>Descrição: ${element.descricao}</p>
                    // <p>Quantidade de Times: ${element.qtdTimes}</p>
                    // <p>Premiação: ${element.premiacao}</p>
                    // `;
                exibirCategorias.appendChild(containerItem);
                exibirCategorias.appendChild(linhaDivisoria);
            }
        });
    }
    else if (getPartidas) {

    }
    else if (getTimes) {

    }
})

