const container = document.getElementById("mainContainer");
const contaOpcoes = document.getElementById("contaOpcoes");
const opcoes = document.getElementById('OpcoesExpandidas');
const criarMaisButton = document.getElementById("criarMaisButton");
const btn_logout = document.getElementById('logout');
const maratonasCreation = document.getElementById('maratonasCreation');
const partidasCreation = document.getElementById('partidasCreation');
const timesCreation = document.getElementById('timesCreation');
const containerBotaopartidas = document.getElementById('containerBotaopartidas');
const containerBotaoMaratonas = document.getElementById('containerBotaoMaratonas');
const containerBotaoTimes = document.getElementById('containerBotaoTimes');
const containerBotaopartidasCreation = document.getElementById('containerBotaopartidasCreation');
const containerBotaoMaratonasCreation = document.getElementById("containerBotaoMaratonasCreation");
const containerBotaoTimesCreation = document.getElementById('containerBotaoTimesCreation');
const criacao = document.getElementById("criacao");
const fecharCriacao = document.getElementById("fecharCriacao");
const fecharEdicaoMaratona = document.getElementById("fecharEdicaoMaratona");
const criarMaratona = document.getElementById("criarMaratona");
const criarTime = document.getElementById("criarTime");
const criarPartida = document.getElementById("criarPartida");
const formMaratona = document.getElementById("criar-maratona-form");
const exibirCategorias = document.getElementById("ExibirCategorias");
const filter = document.getElementById("filter");
const editarMaratona = document.getElementById("edicaoMaratona");
const screenEdicaoConta = document.getElementById("edicaoConta");
const fecharEdicaoConta = document.getElementById("fecharEdicaoConta");
const editarContaAbrir = document.getElementById("editarContaAbrir");
const maratonaTimePertence = document.getElementById("maratonaTimePertence");
const formEditConta = document.getElementById("form-manipular-conta");
const btnDelUser = document.getElementById("btn-del-user");
const fotoPerfil = document.getElementById("user-icon");
const usernameUpdate = document.getElementById('usernameUpdate');
const emailUpdate = document.getElementById('emailUpdate');
const imagemAtualizar = document.getElementById('imagemAtualizar');
const formTime = document.getElementById('criar-time-form');
const intoMaratona = document.getElementById("intoMaratona");
const backToHome = document.getElementById("BackToHome");
const initCreationTeam = document.getElementById("initCreationTeam");
const criacaoTimeScreen = document.getElementById("criacaoTime");

//Variaveis que dirão qual está sendo exibido na tela na hora de filtrar

//Checa se a caixa de logout está expandida ou não
var checkExpansive = false;

//Vetores que guardarão in memory os gets para tornar o programa performático
var maratonasSalvas = [];
var timesSalvos = [];
var partidasSalvas = [];

let userLogado = null;

document.addEventListener('DOMContentLoaded', function () {
    const options = {
        method: 'GET'
    }
    fetch("/user", options)
        .then(response => response.json())
        .then(data => {
            fotoPerfil.src = `data:image/jpeg;base64,${data.icon}`;
            userLogado = {
                nome: data.username,
                id: data.user_id,
                email: data.email,
                icon: fotoPerfil.src
            }
        })
        .catch((error) => {
            console.error('ERROR: ', error);
        });

    exibirMaratonas();
});

const exibirMaratonas = async () => {
    filter.value = '';
    exibirCategorias.innerHTML = '';

    const options = {
        method: 'GET'
    };
    const maratonasSalvasBackup = [...maratonasSalvas];
    maratonasSalvas = [];

    try {
        const response = await fetch('/maratonas', options);
        const data = await response.json();
        console.log('Maratonas:', data);

        data.forEach(maratona => {
            const maratonasObj = {
                id: maratona.id,
                nome: maratona.nome_maratona,
                descricao: maratona.descricao,
                qtdTimes: maratona.qtdTimes,
                premiacao: maratona.premiacao,
            };
            maratonasSalvas.push(maratonasObj);
        });
    } catch (error) {
        maratonasSalvas = maratonasSalvasBackup;
        console.error('ERRO: ', error);
    }

    maratonasSalvas.forEach((element) => {
        const containerItem = document.createElement('li');
        const linhaDivisoria = document.createElement('hr');
        linhaDivisoria.classList.add("horizontal-bar");
        linhaDivisoria.style.marginTop = "0";
        linhaDivisoria.style.marginBottom = "0";
        linhaDivisoria.style.width = "100%";
        linhaDivisoria.style.height = "2px";

        containerItem.innerHTML = `
                    <h3 style="font-size: 1.5em; margin: 10px 0;">${element.nome}</h3>
                    <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Descrição: ${element.descricao}</p>
                    <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Quantidade de Times: ${element.qtdTimes}</p>
                    <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Premiação: ${element.premiacao}</p>
                `;
        containerItem.dataset.index = element.id;
        exibirCategorias.appendChild(containerItem);
        exibirCategorias.appendChild(linhaDivisoria);

        containerItem.addEventListener('click', async () => {
            const atual = {
                id : element.id,
                nome_maratona: element.nome,
                descricao: element.descricao,
                qtdTimes: element.qtdTimes,
                premiacao: element.premiacao,
            }
            IntoMaratona(atual);
            return;
        });
    });
};

const IntoMaratona = (element) => {
    console.log("Entrei aqui");
    container.style.display = "none";
    intoMaratona.style.display = "flex";
    document.getElementById("editorMaratonaButton").addEventListener('click',function(){
        EditarMaratona(element);
    })
    initCreationTeam.addEventListener('click',function(){
        CreateTeam(element);
        ExibirTimes(element.id);
    })
    ExibirTimes(element.id);
}

const ExibirTimes = (maratona_id) =>{


    const options = {
        method: 'GET',
        body: maratona_id
    }

    fetch('/getTimes', options)
        .then(response => response.json())
        .then(data => {
            alert(777);
        })
        .catch((error) => {
            console.error("ERRO: ", error);
        });
}

const CreateTeam = (maratona) =>{
    criacaoTimeScreen.style.display = "flex";
    const imgElement = document.getElementById('imagemAtualizarTime');
    const inputImagemTime = document.getElementById('inputImagemTime');
    document.getElementById('containerArredondadoCriaTime').addEventListener('click', function () {
        inputImagemTime.click();
    });

    document.getElementById('inputImagemTime').addEventListener('change', function (event) {
        const arquivo = event.target.files[0];
        if (arquivo) {
            const urlImagem = URL.createObjectURL(arquivo);
            imgElement.style.width = "100%"
            imgElement.src = urlImagem;
        }
    });
    formTime.addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const formData = new FormData(formTime);
        formData.append("idMaratona",maratona.id)
    
        const options = {
            method: 'POST',
            body: formData
        }
    
        await fetch("/criarTime", options)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    formTime.reset();
                    imgElement.src = 'static\\img\\escudoTime.png';
                    imgElement.style.width = "70%";
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("ERROR: ", error);
            });
    });
}

document.getElementById("fecharCriacaoTime").addEventListener('click',function(){
    criacaoTimeScreen.style.display = "none";
})

const EditarMaratona = (element) => {
    const inputNomeMaratona = document.getElementById("novoNomeMaratona");
    const inputDescricaoMaratona = document.getElementById("novaDescricaoMaratona");
    const inputQtdTimesMaratona = document.getElementById("novaQtdTimesMaratona");
    const inputPremioMaratona = document.getElementById("novoPremioMaratona");
    const botaoEditar = document.getElementById("ConfirmarEdicaoMaratona");
    const botaoExcluir = document.getElementById("ExcluirMaratona");

    editarMaratona.style.display = "flex";
    intoMaratona.classList.add("no-scroll");

    inputNomeMaratona.value = element.nome_maratona;
    inputDescricaoMaratona.value = element.descricao;
    inputQtdTimesMaratona.value = element.qtdTimes;
    inputPremioMaratona.value = element.premiacao;

    botaoEditar.addEventListener('click', async (event) => {
        event.preventDefault();

        const data = {
            id: element.id,
            nome_maratona: inputNomeMaratona.value,
            descricao: inputDescricaoMaratona.value,
            qtdTimes: inputQtdTimesMaratona.value,
            premiacao: inputPremioMaratona.value,
        };

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch("/updateMaratona", options);
            const result = await response.json();
            if (result.status === "success") {
                alert(result.message);
                location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("ERROR: ", error);
        }
    });

    botaoExcluir.addEventListener('click', async (event) => {
        event.preventDefault();

        const data = { id: element.id };

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch("/deleteMaratona", options);
            const result = await response.json();
            if (result.status === "success") {
                alert(result.message);
                location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('ERROR: ', error);
        }
    });
}

backToHome.addEventListener('click', function () {
    container.style.display = "flex";
    intoMaratona.style.display = "none";
})

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
    container.classList.remove("no-scroll");
})

fecharEdicaoMaratona.addEventListener('click', function () {
    editarMaratona.style.display = "none";
    container.classList.remove("no-scroll");
})

fecharEdicaoConta.addEventListener("click", function () {
    screenEdicaoConta.style.display = "none";
    container.classList.remove("no-scroll");
})

editarContaAbrir.addEventListener("click", function () {
    screenEdicaoConta.style.display = "flex";
    container.classList.add("no-scroll");

    usernameUpdate.value = userLogado.nome;
    emailUpdate.value = userLogado.email;
    imagemAtualizar.src = userLogado.icon;

    document.getElementById('containerArredondadoEdicao').addEventListener('click', function () {
        document.getElementById('inputImagem').click();
    });

    document.getElementById('inputImagem').addEventListener('change', function (event) {
        const arquivo = event.target.files[0];
        if (arquivo) {
            const urlImagem = URL.createObjectURL(arquivo);
            const imgElement = imagemAtualizar;
            imgElement.src = urlImagem;
        }
    });

})

criarMaisButton.addEventListener('click', function () {
    criacao.style.display = "flex";
    container.classList.add("no-scroll");
})

btn_logout.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('/logout', { method: 'GET' })
    window.location.href = '/'
})

formEditConta.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formEditConta);

    const options = {
        method: 'PUT',
        body: formData
    }

    fetch('/updateUser', options)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert(data.message);
                location.reload();
            } else {
                if (data.status === "error") {
                    alert("erro ao atulizar sua conta.");
                } else if (data.status == "N/A") {
                    alert(data.message);
                }
            }
        })
        .catch((error) => {
            console.log("Erro: ", error);
        });
})

btnDelUser.addEventListener('click', (event) => {
    event.preventDefault();

    fetch("/deleteUser", { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (data.status === "sucess") {
                alert(data.message);
                window.location.href = "/"
            } else {
                alert("erro ao deletar!");
            }
        })
        .catch((error) => {
            console.error("ERRO: ", error);
        })
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
                exibirMaratonas();
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
                    <h3 style="font-size: 1.5em; margin: 10px 0;">${element.nome}</h3>
                    <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Descrição: ${element.descricao}</p>
                    <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Quantidade de Times: ${element.qtdTimes}</p>
                    <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Premiação: ${element.premiacao}</p>
                `;
            exibirCategorias.appendChild(containerItem);
            exibirCategorias.appendChild(linhaDivisoria);
            const totalChildWidth = Array.from(containerItem.children).reduce((total, child) => {
                return total + child.clientWidth;
            }, 0);

            if (totalChildWidth > containerItem.clientWidth) {
                containerItem.style.flexDirection = 'column';
            }
            containerItem.addEventListener('click', function () {
                const inputNomeMaratona = document.getElementById("novoNomeMaratona");
                const inputDescricaoMaratona = document.getElementById("novaDescricaoMaratona");
                const inputQtdTimesMaratona = document.getElementById("novaQtdTimesMaratona");
                const inputPremioMaratona = document.getElementById("novoPremioMaratona");

                editarMaratona.style.display = "flex";
                container.classList.add("no-scroll");

                inputNomeMaratona.value = element.nome;
                inputDescricaoMaratona.value = element.descricao;
                inputQtdTimesMaratona.value = element.qtdTimes;
                inputPremioMaratona.value = element.qtdTimes;
            })
        }
    });
})

const handleMaratonaClick = (index) => {
    const inputNomeMaratona = document.getElementById("novoNomeMaratona");
    const inputDescricaoMaratona = document.getElementById("novaDescricaoMaratona");
    const inputQtdTimesMaratona = document.getElementById("novaQtdTimesMaratona");
    const premioMaratona = document.getElementById("novoPremioMaratona");

    editarMaratona.style.display = "flex";
    container.classList.add("no-scroll");

}