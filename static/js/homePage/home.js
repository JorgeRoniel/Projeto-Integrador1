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
const formEditTime = document.getElementById('editar-time-form');
const intoMaratona = document.getElementById("intoMaratona");
const backToHome = document.getElementById("BackToHome");
const initCreationTeam = document.getElementById("initCreationTeam");
const criacaoTimeScreen = document.getElementById("criacaoTime");
const toggleIcon = document.getElementById("toggleIcon");
const overlay = document.getElementById("overlay");
const overlayIntoMaratona = document.getElementById("overlayIntoMaratona");
const overlayIntoTime = document.getElementById("overlayIntoTime");
const containerExibirTimes = document.getElementById("containerExibirTimes");
const sidebar = document.getElementById("sidebar");
const intoTime = document.getElementById("IntoTime");
const EditarTimeContainer = document.getElementById("EditarTime");
const sidebarMaratona = document.getElementById("sidebarMaratona");
const sidebarTime = document.getElementById("sidebarTime");
const criacaoParticipante = document.getElementById("criacaoParticipante");
const filterTime = document.getElementById("filterTime");
const rodadasContainer = document.getElementById('rodadas');
const torneioContainer = document.getElementById("torneio-container");
const containerCampeao = document.getElementById("containerCampeao");
const body = document.getElementById("body");
const criacaoPartida = document.getElementById("criarPartida");
const OptionsVencedor = document.getElementById("TimeVencedor");

//Vetores que guardarão in memory os gets para tornar o programa performático
var maratonasSalvas = [];
var timesSalvos = [];
var partidasSalvas = [];

var competidoresSalvos = [[]]

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
    const maratonasSalvasBackup = maratonasSalvas;
    maratonasSalvas = [];

    try {
        const response = await fetch('/maratonas', options);
        const data = await response.json();
        console.log('Maratonas:', data);

        data.forEach(maratona => {
            const maratonasObj = {
                id: maratona.MId,
                nome: maratona.name,
                descricao: maratona.desc,
                qtdTimes: maratona.numTeam,
                premiacao: maratona.prize,
            };
            maratonasSalvas.push(maratonasObj);
        });
    } catch (error) {
        maratonasSalvas = maratonasSalvasBackup;
        console.error('ERRO: ', error);
    }

    maratonasSalvas.forEach((element, index) => {
        const containerItem = document.createElement('li');

        containerItem.innerHTML = `
            <h3 style="font-size: 1.5em; margin: 10px 0;">${element.nome}</h3>
            <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Descrição: ${element.descricao}</p>
            <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Quantidade de Times: ${element.qtdTimes}</p>
            <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Premiação: ${element.premiacao}</p>
        `;
        containerItem.dataset.index = element.id;
        exibirCategorias.appendChild(containerItem);

        // Adiciona a linha divisória apenas se não for o último item
        if (index < maratonasSalvas.length - 1) {
            const linhaDivisoria = document.createElement('hr');
            linhaDivisoria.classList.add("horizontal-bar");
            linhaDivisoria.style.marginTop = "0";
            linhaDivisoria.style.marginBottom = "0";
            linhaDivisoria.style.width = "100%";
            linhaDivisoria.style.height = "3px";
            exibirCategorias.appendChild(linhaDivisoria);
        }

        containerItem.onclick = async () => {

            if (backToHome.style.pointerEvents === 'none') return;

            backToHome.style.pointerEvents = 'none';

            const atual = {
                id: element.id,
                nome_maratona: element.nome,
                descricao: element.descricao,
                qtdTimes: element.qtdTimes,
                premiacao: element.premiacao,
            };
            IntoMaratona(atual, containerItem);
        };
    });
};

const IntoMaratona = (element, containerItem) => {
    rodadasContainer.innerHTML = '';
    let getCacheTimes = timesSalvos.length > 0 && element.id == timesSalvos[0].maratonaId ? true : false
    ExibirTimes(element, getCacheTimes, rodadas);
    intoMaratona.classList.remove('hide');
    intoMaratona.classList.add('show');
    sidebar.style.display = "flex";
    sidebar.classList.remove('hide');
    sidebar.classList.add('show');
    container.classList.add("no-scroll");
    body.classList.add("no-scrollbody");
    const editorButton = document.getElementById("editorMaratonaButton");
    const initCreationTeam = document.getElementById("initCreationTeam");

    editorButton.onclick = function (event) {
        EditarMaratona(element);
    };

    backToHome.onclick = function () {
        sidebar.classList.remove('show');
        sidebar.classList.add('hide');
        intoMaratona.classList.remove('show');
        intoMaratona.classList.add('hide');
        setTimeout(function () {
            container.classList.remove('no-scroll');
        }, 200);
        body.classList.remove("no-scrollbody");
    }

    initCreationTeam.onclick = function (event) {
        if (timesSalvos.length === element.qtdTimes) {
            alert("Número máximo de times atingido para essa maratona");
            event.preventDefault();
            return;
        }
        CreateTeam(element);
    };
    const chaveamento = document.getElementById("chaveamento");

    chaveamento.onclick = function () {
        if (rodadas[rodadas.length - 2]) { // caso o torneio nao tenha começado (nao teve nenhum vencedor nas partidas) é permitido o chaveamento
            const partidasRodada = rodadas[rodadas.length - 2];

            // Verifica se alguma partida tem um vencedor definido
            const partidaComVencedor = partidasRodada.some(partida => partida.vencedor !== null);

            // Se houver uma partida com vencedor, interrompe a ação
            if (partidaComVencedor) {
                alert("Existe uma partida com vencedor definido, o chaveamento não pode ser realizado");
                return;
            }

            alert("Nenhum vencedor nas partidas então o chaveamento é permitido");
            // Aqui é o código pra jogar os times nas partidas aleatoriamente, obivamente nas partidas mais à esquerda
        }
    };
}

const ExibirTimes = async (maratona, getCacheTimes, rodadas) => {

    const loadingIndicator = document.getElementById('loadingTimes');
    loadingIndicator.style.display = 'flex';

    filterTime.value = '';
    containerExibirTimes.innerHTML = '';

    if (!getCacheTimes) {
        const timesSalvosBackup = timesSalvos;
        timesSalvos = [];
        const escudoTime = document.createElement("img");
        const formData = new FormData();
        formData.append("maratona_id", maratona.id);

        const options = {
            method: 'POST',
            body: formData
        };
        try {
            const response = await fetch('/getTimes', options);
            if (!response.ok) {
                throw new Error('Erro de rede');
            }
            const data = await response.json();
            data.forEach(time => {
                escudoTime.src = `data:image/jpeg;base64,${time.escudo}`;
                const timesObj = {
                    id: time.id,
                    nome: time.nome_time,
                    abreviacao: time.abreviacao,
                    maratonaId: time.maratonaId,
                    icon: escudoTime.src,
                };
                timesSalvos.push(timesObj);
            });
        } catch (error) {
            timesSalvos = timesSalvosBackup;
            console.error('ERRO: ', error);
        }
    }
    adicionarPartida(maratona);
    const fragment = document.createDocumentFragment();
    loadingIndicator.style.display = 'none';
    backToHome.style.pointerEvents = 'auto';
    timesSalvos.forEach((element) => {
        const containerItem = document.createElement('li');
        containerItem.classList.add('time-item');
        containerItem.innerHTML = `
            <img src="${element.icon}" alt="${element.abreviacao}">
            <p>${element.abreviacao}</p>
        `;
        containerItem.dataset.index = element.id;
        fragment.appendChild(containerItem);

        containerItem.onclick = function () {
            IntoTeam(element, rodadas);
        }
    });

    containerExibirTimes.appendChild(fragment);
};

const IntoTeam = (time, rodadas) => {
    const lista = document.getElementById("containerExibirCompetidores");
    lista.innerHTML = '';
    torneioContainer.innerHTML = '';
    sidebarMaratona.classList.remove('show');
    sidebarMaratona.classList.add('hide');
    sidebarTime.classList.remove('hide');
    sidebarTime.classList.add('show');

    criacaoParticipante.classList.add('show');

    const imagemTime = document.getElementById('imagemTime');
    imagemTime.src = time.icon;

    const loadingIndic = document.getElementById('loadingDev');
    loadingIndic.style.display = 'flex';

    document.getElementById("BackToMaratona").onclick = function () {
        sidebarTime.classList.remove('show');
        sidebarTime.classList.add('hide');
        sidebarMaratona.classList.remove('hide');
        sidebarMaratona.classList.add('show');
        criacaoParticipante.classList.remove('show');

        torneioContainer.appendChild(containerCampeao);
        torneioContainer.appendChild(rodadasContainer);
    }

    document.getElementById("editorTimeButton").onclick = function () {
        EditarTime(time);
    }

    document.getElementById("ConfirmarCriacaoParticipante").onclick = async function (event) {
        event.preventDefault();

        const lista = document.getElementById("containerExibirCompetidores");
        lista.innerHTML = '';
        const loadingIndic = document.getElementById('loadingDev');
        loadingIndic.style.display = 'flex';

        const nomeParticipanteInput = document.querySelector("input[name='nomeParticipante']");
        const nomeParticipante = nomeParticipanteInput.value;
        const timeId = time.id;

        if (!nomeParticipante) {
            alert("O nome do competidor é obrigatório!");
            return;
        }

        const data = {
            nomeJogador: nomeParticipante,
            timeId: timeId
        };

        try {
            const response = await fetch("/createCompetidor", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

        } catch (error) {
            console.error("Erro ao criar competidor:", error);
        }
        AtualizarListaCompetidores(timeId);
        nomeParticipanteInput.value = '';
    }

    const AtualizarListaCompetidores = async (timeId) => {
        try {
            const response = await fetch(`/competidor?time_id=${timeId}`, { method: 'GET' });
            if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

            const competidores = await response.json();
            const lista = document.getElementById("containerExibirCompetidores");
            lista.innerHTML = '';

            competidores.forEach(({ nome_competidor, id }) => {
                const li = document.createElement("li");
                li.textContent = nome_competidor;
                li.dataset.id = id;

            const deleteIcon = document.createElement("i");
            deleteIcon.className = "bi bi-trash-fill";
                deleteIcon.addEventListener("click", async (event) => {
                    event.stopPropagation();
                    const id = li.dataset.id;
                    try {
                        const deleteResponse = await fetch('/deleteCompetidor', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id })
                        });

                        const result = await deleteResponse.json();
                        if (result.status === "success") {
                            li.remove();
                        } else {
                            console.error("Erro ao excluir competidor:", result.message);
                        }
                    } catch (error) {
                        console.error("Erro ao excluir competidor:", error);
                    }
                });

                li.appendChild(deleteIcon);
                lista.appendChild(li);
            });
            loadingIndic.style.display = 'none';
        } catch (error) {
            console.error("Erro ao carregar competidores:", error);
        }
    };

    AtualizarListaCompetidores(time.id);
}

const EditarTime = (time) => {
    EditarTimeContainer.classList.add('show');
    overlayIntoMaratona.classList.add('show');
    intoMaratona.classList.add("no-scroll");

    const botaoEditar = document.getElementById("ConfirmarEdicaoTime");
    const botaoExcluir = document.getElementById("ExcluirTime");

    const nomeTime = document.getElementById("nomeTimeEditar");
    const abreviacaoTime = document.getElementById("AbreviacaoEditar");
    nomeTime.value = time.nome;
    abreviacaoTime.value = time.abreviacao;

    const imgElement = document.getElementById('imagemAtualizarTimeEdicao');
    imgElement.src = time.icon;
    const inputImagemTime = document.getElementById('inputImagemTimeEditar');

    let currentImageFile = null;

    document.getElementById('containerArredondadoEditaTime').onclick = function () {
        inputImagemTime.click();
    };

    inputImagemTime.onchange = function (event) {
        const arquivo = event.target.files[0];
        if (arquivo) {
            const urlImagem = URL.createObjectURL(arquivo);
            imgElement.style.width = "100%";
            imgElement.src = urlImagem;
            currentImageFile = arquivo;
        }
    };

    botaoEditar.onclick = async function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("NovoNomeTime", nomeTime.value);
        formData.append("NovaAbreviacao", abreviacaoTime.value);
        formData.append("id", time.id);

        if (currentImageFile) {
            formData.append("NovoEscudoTime", currentImageFile);
        } else {
            const response = await fetch(time.icon);
            const blob = await response.blob();
            formData.append("NovoEscudoTime", blob, "imagem_atual.png");
        }

        const options = {
            method: 'PUT',
            body: formData
        };

        try {
            const response = await fetch("/updateTime", options);
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
    };

    botaoExcluir.onclick = async function (event) {
        event.preventDefault();

        const data = { id: time.id };

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch("/deleteTime", options);
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
    };
};

const CreatePartida = (partida) => {
    criacaoPartida.classList.add('show');
    overlayIntoMaratona.classList.add('show');
    intoMaratona.classList.add("no-scroll");

    const LocalPartida = document.getElementById("LocalPartida");
    const DataPartida = document.getElementById("DataPartida");
    //LocalPartida.value = partida.Local;
    //DataPartida.value = partida.Data;

    document.getElementById("fecharCriacaoPartida").onclick = function () {
        criacaoPartida.classList.remove('show');
        overlayIntoMaratona.classList.remove('show');
        intoMaratona.classList.remove("no-scroll");
    }
    
}

const CreateTeam = (maratona) => {

    criacaoTimeScreen.classList.add('show');
    overlayIntoMaratona.classList.add('show');
    intoMaratona.classList.add("no-scroll");

    const imgElement = document.getElementById('imagemAtualizarTime');
    const inputImagemTime = document.getElementById('inputImagemTime');

    document.getElementById('containerArredondadoCriaTime').onclick = function () {
        inputImagemTime.click();
    };

    document.getElementById('inputImagemTime').onchange = function (event) {
        const arquivo = event.target.files[0];
        if (arquivo) {
            const urlImagem = URL.createObjectURL(arquivo);
            imgElement.style.width = "100%";
            imgElement.src = urlImagem;
        }
    };

    formTime.onsubmit = async function (event) {
        event.preventDefault();

        const formData = new FormData(formTime);
        formData.append("idMaratona", maratona.id);

        const options = {
            method: 'POST',
            body: formData
        };

        try {
            const response = await fetch("/criarTime", options);
            const data = await response.json();

            if (data.status === 'success') {
                alert(data.message);
                if (timesSalvos.length + 1 === maratona.qtdTimes) {
                    criacaoTimeScreen.classList.remove('show');
                    overlayIntoMaratona.classList.remove('show');
                    intoMaratona.classList.remove("no-scroll");
                    ExibirTimes(maratona.id, false);
                    return;
                }
                ExibirTimes(maratona.id, false);
                formTime.reset();
                imgElement.src = 'static/img/escudoTime.png';
                imgElement.style.width = "70%";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("ERROR: ", error);
        }
    };

    document.getElementById("fecharCriacaoTime").onclick = function () {
        criacaoTimeScreen.classList.remove('show');
        overlayIntoMaratona.classList.remove('show');
        intoMaratona.classList.remove("no-scroll");
    };
};

document.getElementById("fecharEdicaoTime").onclick = function () {
    EditarTimeContainer.classList.remove('show');
    overlayIntoMaratona.classList.remove('show');
    intoMaratona.classList.remove("no-scroll");
}

const EditarMaratona = (element) => {
    const inputNomeMaratona = document.getElementById("novoNomeMaratona");
    const inputDescricaoMaratona = document.getElementById("novaDescricaoMaratona");
    const inputQtdTimesMaratona = document.getElementById("novaqtdTimes");
    const inputPremioMaratona = document.getElementById("novoPremioMaratona");
    const botaoEditar = document.getElementById("ConfirmarEdicaoMaratona");
    const botaoExcluir = document.getElementById("ExcluirMaratona");

    editarMaratona.classList.add('show');
    overlayIntoMaratona.classList.add('show');
    body.classList.add("no-scrollbody");

    inputNomeMaratona.value = element.nome_maratona;
    inputDescricaoMaratona.value = element.descricao;
    inputQtdTimesMaratona.value = element.qtdTimes;
    inputPremioMaratona.value = element.premiacao;

    botaoEditar.onclick = async (event) => {
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
    };

    botaoExcluir.onclick = async (event) => {
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
    };
}

contaOpcoes.addEventListener('mouseenter', function () {
    opcoes.style.display = "flex";
    toggleIcon.classList.add("rotate");
})

opcoes.addEventListener('mouseenter', function () {
    opcoes.style.display = "flex";
    toggleIcon.classList.add("rotate");
})

contaOpcoes.addEventListener('mouseleave', function () {

    if (!opcoes.matches(':hover')) {
        opcoes.style.display = "none";
        toggleIcon.classList.remove("rotate");
    }

})

opcoes.addEventListener('mouseleave', function () {

    if (!contaOpcoes.matches(':hover')) {
        opcoes.style.display = "none";
        toggleIcon.classList.remove("rotate");
    }

})

fecharCriacao.onclick = function () {
    criacao.classList.remove('show');
    overlay.classList.remove('show');
    body.classList.remove("no-scrollbody");
}

fecharEdicaoMaratona.onclick = function () {
    editarMaratona.classList.remove('show');
    overlayIntoMaratona.classList.remove('show');
    intoMaratona.classList.remove("no-scroll");
}

fecharEdicaoConta.onclick = function () {
    screenEdicaoConta.classList.remove('show');
    overlay.classList.remove('show');
    body.classList.remove("no-scrollbody");
}

editarContaAbrir.onclick = function () {
    screenEdicaoConta.classList.add('show');
    overlay.classList.add('show');
    body.classList.add("no-scrollbody");

    usernameUpdate.value = userLogado.nome;
    emailUpdate.value = userLogado.email;
    imagemAtualizar.src = userLogado.icon;

    let currentImageUrl = '';

    const inputImagem = document.getElementById('inputImagem');
    const containerArredondadoEdicao = document.getElementById('containerArredondadoEdicao');

    containerArredondadoEdicao.onclick = function () {
        inputImagem.click();
    };

    inputImagem.onchange = function (event) {
        const arquivo = event.target.files[0];
        if (arquivo) {

            if (currentImageUrl) {
                URL.revokeObjectURL(currentImageUrl);
            }

            currentImageUrl = URL.createObjectURL(arquivo);
            imagemAtualizar.src = currentImageUrl;

        }
    };
};



function mostrarSenha() {
    var inputPass = document.getElementById('newPassword');
    var btnShowPass = document.getElementById('btn-senha');

    if (inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text')
        btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
    } else {
        inputPass.setAttribute('type', 'password')
        btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
    }
}

criarMaisButton.onclick = function () {
    criacao.classList.add('show');
    overlay.classList.add('show');
    body.classList.add("no-scrollbody");
}

btn_logout.onclick = function (event) {
    event.preventDefault();

    fetch('/logout', { method: 'GET' })
    window.location.href = '/'
}

formEditConta.onsubmit = (event) => {
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
}

btnDelUser.onclick = (event) => {
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
}

formMaratona.onsubmit = async function (event) {
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
                formMaratona.reset();
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
};

filterTime.oninput = function (event) {
    containerExibirTimes.innerHTML = '';

    const timesFiltrados = timesSalvos.filter(element =>
        element.abreviacao.toLowerCase().includes(event.target.value.toLowerCase())
    );

    timesFiltrados.forEach((element) => {
        const containerItem = document.createElement('li');
        containerItem.classList.add('time-item');
        containerItem.innerHTML = `
            <img src="${element.icon}" alt="${element.abreviacao}">
            <p>${element.abreviacao}</p>
        `;
        containerItem.dataset.index = element.id;
        containerExibirTimes.appendChild(containerItem);

        containerItem.onclick = function () {
            IntoTeam(element);
        }
    });
}

filter.oninput = function (event) {
    exibirCategorias.innerHTML = '';

    const maratonasFiltradas = maratonasSalvas.filter(element =>
        element.nome.toLowerCase().includes(event.target.value.toLowerCase())
    );

    maratonasFiltradas.forEach((element, index) => {
        const containerItem = document.createElement('li');
        containerItem.innerHTML = `
            <h3 style="font-size: 1.5em; margin: 10px 0;">${element.nome}</h3>
            <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Descrição: ${element.descricao}</p>
            <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Quantidade de Times: ${element.qtdTimes}</p>
            <p style="font-size: 1em; color: #ccc; margin: 5px 0;">Premiação: ${element.premiacao}</p>
        `;
        exibirCategorias.appendChild(containerItem);

        if (index < maratonasFiltradas.length - 1) {
            const linhaDivisoria = document.createElement('hr');
            linhaDivisoria.classList.add("horizontal-bar");
            linhaDivisoria.style.marginTop = "0";
            linhaDivisoria.style.marginBottom = "0";
            linhaDivisoria.style.width = "100%";
            linhaDivisoria.style.height = "3px";
            exibirCategorias.appendChild(linhaDivisoria);
        }

        // Adiciona o evento de clique para abrir a tela de edição da maratona
        containerItem.addEventListener('click', function () {
            const atual = {
                id: element.id,
                nome_maratona: element.nome,
                descricao: element.descricao,
                qtdTimes: element.qtdTimes,
                premiacao: element.premiacao,
            };
            IntoMaratona(atual);
        });
    });
};

const CalculaNumPartidas = (qtdTimes) => {
    let soma = qtdTimes;
    while (qtdTimes != 1) {
        qtdTimes = qtdTimes / 2;
        soma += qtdTimes;
    }
    return soma;
}

let idPartida = 0; // Só pra poder ter o controle

function adicionarPartida(maratona) {

    let rodadas = [[]];
    let numPartidas = CalculaNumPartidas(maratona.qtdTimes / 2);

    for (let i = 0; i < numPartidas; i++) {
        const partida = {
            id: idPartida++,
            times: [{ nome: '', abreviacao: '' }, { nome: '', abreviacao: '' }],
            vencedor: null,
            maratonaId: maratona.id
        };

        rodadas[rodadas.length - 1].push(partida);
        if (rodadas[rodadas.length - 1].length === Math.pow(2, rodadas.length - 1)) {
            rodadas.push([]);
        }
    }
    atualizarLayout(rodadas);

}

function atualizarLayout(rodadas) {
    rodadasContainer.innerHTML = '';

    rodadas.forEach((rodada, indexRodada) => {
        const rodadaDiv = document.createElement('div');
        rodadaDiv.classList.add('rodada');

        let gap = 107;

        if (rodadas.length === 3) {
            if (indexRodada === 1) {
                rodadaDiv.style.gap = `${110}px`;
                gap = 110 + 107;
            }
        }
        if (rodadas.length > 3) {
            if (indexRodada === 1) {
                rodadaDiv.style.gap = `${330}px`;
                gap = 330 + 107;
            }
            if (indexRodada === 2) {
                rodadaDiv.style.gap = `${110}px`;
                gap = 110 + 107;
            }
        }


        rodada.forEach((partida, indexPartida) => {
            const partidaDiv = document.createElement('div');
            partidaDiv.classList.add('partida');

            const time1 = document.createElement('select');
            time1.classList.add('time');
            selecionarTime(partida.id, 0, rodadas, time1);
            time1.addEventListener('click', function () {
                if (timesSalvos.length === 0) {
                    alert("Nenhum time criado!");
                    return;
                }
            })

            // Adiciona as opções ao select

            const time2 = document.createElement('select');
            time2.classList.add('time');
            selecionarTime(partida.id, 1, rodadas, time2);
            time2.addEventListener('click', function () {
                if (timesSalvos.length === 0) {
                    alert("Nenhum time criado!");
                    return;
                }
            })

            const trof = document.createElement('div');
            trof.classList.add('seta');
            trof.innerHTML = '<i class="bi bi-trophy-fill"></i>';
            trof.onclick = async () => CriarPartida(partida, rodadas);

            // Habilitar ou desabilitar baseando-se na rodada e no número de times
            if (indexRodada === rodadas.length - 2) {
                const temDoisTimes = partida.times[0].nome !== '' && partida.times[1].nome !== '';
                const vence = partida.vencedor === null;
                time1.disabled = !vence;
                time2.disabled = !vence;
                trof.style.pointerEvents = (temDoisTimes && partida.vencedor === null) ? 'auto' : 'none';
                if (vence && !temDoisTimes) {
                    trof.style.color = "black";
                } else if (vence && temDoisTimes) {
                        trof.style.color = "green";
                } else {
                    trof.style.color = "gold";
                }
            } else {
                const temDoisTimes = (partida.times[0].nome !== '' && partida.times[1].nome !== '');
                const vence = partida.vencedor === null;
                time1.disabled = true;
                time2.disabled = true;
                trof.style.pointerEvents = temDoisTimes && partida.vencedor === null ? 'auto' : 'none';
                if (!temDoisTimes && vence) {
                    trof.style.color = "gray";
                } else if (temDoisTimes && vence) {
                    trof.style.color = "green";
                } else {
                    trof.style.color = "gold";
                }
            }

            // Monta a estrutura da partida
            partidaDiv.appendChild(time1);
            partidaDiv.appendChild(trof);
            partidaDiv.appendChild(time2);
            

            // Se for uma partida par, adicionar a linha vertical que conecta à partida ímpar
            // Adiciona a linha vertical se a rodada estiver cheia
            if (rodada.length >= Math.pow(2, indexRodada)) {
                if (indexPartida % 2 === 0 && rodada[indexPartida + 1]) {
                    const linhaVertical = document.createElement('div');
                    linhaVertical.classList.add('linha-vertical');
                    linhaVertical.style.height = `${gap}px`;
                    partidaDiv.appendChild(linhaVertical);
                }
            } else {
                // Adiciona a linha vertical alternativa se a rodada não estiver cheia
                if (indexPartida % 2 === 0 && rodada[indexPartida + 1]) {
                    const linhaVertical2 = document.createElement('div');
                    linhaVertical2.classList.add('vertical2');
                    linhaVertical2.style.height = `${gap}px`;
                    partidaDiv.appendChild(linhaVertical2);
                }
            }

            // Se não for a última rodada, adiciona linha horizontal para a próxima rodada
            if (indexRodada > 0 && rodadas[indexRodada - 1].length === Math.floor(rodada.length / 2)) {
                const linhaHorizontal = document.createElement('div');
                linhaHorizontal.classList.add('linha-horizontal');
                partidaDiv.appendChild(linhaHorizontal);

            }
            if (indexRodada === 0) { // pra ter na final
                const linhaHorizontal = document.createElement('div');
                linhaHorizontal.classList.add('linha-horizontal');
                partidaDiv.appendChild(linhaHorizontal);
            }

            rodadaDiv.appendChild(partidaDiv);
        });

        rodadasContainer.appendChild(rodadaDiv);
        $('.time').select2({
            templateResult: function (data) {
                if (!data.id) {
                    return data.text;
                }
        
                // Se o value for "Remover", exibe apenas o ícone de lixeira
                if (data.element && data.element.value === "Remover") {
                    const $remover = $(`
                        <span style="display: block; background-color: red; color: white; padding: 5px; border-radius: 5px;">
                            <i class="bi bi-trash" style="color: white;"></i>
                        </span>
                    `);
                    return $remover;
                }
        
                return data.text; // Para as outras opções, exibe o texto normalmente
            },
            escapeMarkup: function (markup) {
                return markup;
            }
        });
    });
}

function definirVencedor(partida, rodadas, vencedor) {
    if (partida && !partida.vencedor) {
        const time1 = partida.times[0];
        const time2 = partida.times[1];

        if (time1 && time2) {
            if (vencedor == time1.id || vencedor == time2.id) {
                let objectVencedor = vencedor === time1.id ? time1 : time2
                partida.vencedor = {
                    nome: objectVencedor.nome,
                    abreviacao: objectVencedor.abreviacao,
                    icon: objectVencedor.icon,
                    id: objectVencedor.id,
                    maratonaId: objectVencedor.maratonaId
                };
                if (rodadas[0].includes(partida)) {
                    const imagemCampeao = document.getElementById('imagemCampeao');
                    imagemCampeao.src = partida.vencedor.icon;
                } else {
                    enviarVencedorProximaRodada(partida, rodadas);
                }
            } else {
                alert("Escolha inválida. Tente novamente.");
            }
        } else {
            alert("Ambos os times devem ser selecionados antes de definir o vencedor.");
        }
    }
    atualizarLayout(rodadas);
}

function enviarVencedorProximaRodada(partida, rodadas) {
    const rodadaAtual = rodadas.find(rodada => rodada.includes(partida));
    const rodadaIndex = rodadas.indexOf(rodadaAtual);
    const proximaRodada = rodadas[rodadaIndex - 1];

    if (proximaRodada) {
        const posicaoNaRodadaAtual = rodadaAtual.indexOf(partida);
        const posicaoNaProximaRodada = Math.floor(posicaoNaRodadaAtual / 2);

        let proximaPartida = proximaRodada[posicaoNaProximaRodada];

        if (!proximaPartida.times[0].nome) {
            proximaPartida.times[0] = partida.vencedor;
        } else {
            proximaPartida.times[1] = partida.vencedor;
        }
    }

    atualizarLayout(rodadas);
}

const CriarPartida = (partida, rodadas) => {

    criacaoPartida.classList.add('show');
    overlayIntoMaratona.classList.add('show');
    intoMaratona.classList.add("no-scroll");

    const BotaoCriar = document.getElementById("ConfirmarCriacaoPartida");

    const optionTime1 = document.createElement("option");
    optionTime1.value = partida.times[0].id;
    optionTime1.innerHTML = partida.times[0].abreviacao;

    const optionTime2 = document.createElement("option");
    optionTime2.value = partida.times[1].id;
    optionTime2.innerHTML = partida.times[1].abreviacao;

    OptionsVencedor.appendChild(optionTime1);
    OptionsVencedor.appendChild(optionTime2);

    document.getElementById("fecharCriacaoPartida").onclick = function () {
        fecharTelaCriarPartida();
    }

    BotaoCriar.onclick = async function () {
        const vencedor = await insertPartida(partida);
        if (vencedor === "Inexistente") {
            alert("Todos os campos são nesessários!");
        }
        else {
            definirVencedor(partida, rodadas, vencedor)
            fecharTelaCriarPartida();
        }
    }
};

const fecharTelaCriarPartida = () => {
    const LocalPartida = document.getElementById("LocalPartida");
    const DataPartida = document.getElementById("DataPartida");
    LocalPartida.value = "";
    DataPartida.value = "";
    OptionsVencedor.innerHTML = "";
    criacaoPartida.classList.remove('show');
    overlayIntoMaratona.classList.remove('show');
    intoMaratona.classList.remove("no-scroll");
}

const insertPartida = async (partida) => {
    const LocalPartida = document.getElementById("LocalPartida");
    const DataPartida = document.getElementById("DataPartida");
    let vencedor = "Inexistente";
    if (LocalPartida.value === "" || DataPartida.value === "") {
        return vencedor;
    }

    const formData = new FormData();
    formData.append("time1", partida.times[0].id);
    formData.append("time2", partida.times[1].id);
    formData.append("vencedor", idVencedor);
    formData.append("maratonaId", partida.maratonaId);
    formData.append("local_partida", "");
    formData.append("data_partida", dataFormatada);

    const options = {
        method: 'POST',
        body: formData, // Enviar diretamente o FormData
    };

    try {
        const response = await fetch('/createPartida', options);
        const data = await response.json();

        if (data.status === "success") {
            // Chamar método da próxima rodada
            alert(data.message);
        } else if (data.status === "error") {
            alert("Erro ao criar partida");
        } else if (data.status === "N/A") {
            alert(data.message);
        }
    } catch (error) {
        console.log("Erro: ", error);
    }
    return vencedor;
}

function selecionarTime(partidaId, timeIndex, rodadas, time) {
    const partida = rodadas.flat().find(p => p.id === partidaId);
    time.innerHTML = '';

    let vetorOpcoesSelecionadas = []

        for (let i = 0; i < timesSalvos.length; i++) {
            const timeOpcao = document.createElement("option");
            timeOpcao.value = timesSalvos[i].nome;
            timeOpcao.textContent = timesSalvos[i].abreviacao;
            time.appendChild(timeOpcao);
        }

    rodadas.forEach(rodada => {
        rodada.forEach(partida => {
            partida.times.forEach((time) => {
                vetorOpcoesSelecionadas.push(time);
            })
        });
    });

    const timeOpcaoEsvaziar = document.createElement("option");
    timeOpcaoEsvaziar.value = "Remover";
    time.appendChild(timeOpcaoEsvaziar);

    if (partida && partida.times[timeIndex]) {
        time.value = partida.times[timeIndex].nome;
    }

    // Atualiza a interface quando um time é selecionado
    time.onchange = async function () {
        if (partida) {

            let isOption = true
            vetorOpcoesSelecionadas.forEach(timeSelecionado => {
                if (timeSelecionado.nome === time.value) {
                    isOption = false;
                }
            });

            if (!isOption) {
                alert("Time já foi selecionado!")
            }
            const timeSelecionado = timesSalvos.find(t => t.nome === time.value);
            if (timeSelecionado && isOption) {
                const validateCompetidor = await ValidarCompetidores(timeSelecionado.id);
                if (validateCompetidor) {
                    partida.times[timeIndex] = {
                        nome: timeSelecionado.nome,
                        abreviacao: timeSelecionado.abreviacao,
                        id: timeSelecionado.id,
                        maratonaId: timeSelecionado.maratonaId,
                        icon: timeSelecionado.icon
                    };
                    atualizarLayout(rodadas);
                } 
            }
            else {
                partida.times[timeIndex] = {
                    nome: '',
                    abreviacao: ''
                }; 
                atualizarLayout(rodadas);
            }
        }
    };
}

const ValidarCompetidores = async (id) => {
    try {
        const response = await fetch(`/competidor?time_id=${id}`, { method: 'GET' });
        if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

        const competidores = await response.json();

        if (competidores.length > 0) {
            return true;
        }
        else {
            alert("Adicione ao menos 1 competidor ao time!");
            return false;
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        return false;
    }
}