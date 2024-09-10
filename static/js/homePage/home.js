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

//Variaveis que dirão qual está sendo exibido na tela na hora de filtrar

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
    const maratonasSalvasBackup = maratonasSalvas;
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
            const atual = {
                id: element.id,
                nome_maratona: element.nome,
                descricao: element.descricao,
                qtdTimes: element.qtdTimes,
                premiacao: element.premiacao,
            };
            IntoMaratona(atual);
        };
    });
};

const IntoMaratona = (element) => {
    let getCacheTimes = timesSalvos.length > 0 && element.id == timesSalvos[0].maratonaId ? true : false
    ExibirTimes(element.id, getCacheTimes);
    intoMaratona.classList.remove('hide'); 
    intoMaratona.classList.add('show');
    sidebar.style.display = "flex";
    sidebar.classList.remove('hide'); 
    sidebar.classList.add('show');
    container.classList.add("no-scroll");
    const editorButton = document.getElementById("editorMaratonaButton");
    const initCreationTeam = document.getElementById("initCreationTeam");

    editorButton.removeEventListener('click', handleEditMaratona);
    editorButton.addEventListener('click', handleEditMaratona);

    initCreationTeam.removeEventListener('click', handleCreateTeam);
    initCreationTeam.addEventListener('click', handleCreateTeam);

    function handleEditMaratona() {
        EditarMaratona(element);
    }

    function handleCreateTeam() {
        CreateTeam(element);
    }
}


const ExibirTimes = async (maratona_id, getCacheTimes) => {

     const loadingIndicator = document.getElementById('loadingTimes');
    loadingIndicator.style.display = 'flex';

    filterTime.value = '';
    containerExibirTimes.innerHTML = '';

    if (!getCacheTimes) {
        const timesSalvosBackup = timesSalvos;
        timesSalvos = [];
        const escudoTime = document.createElement("img");
        const formData = new FormData();
        formData.append("maratona_id", maratona_id);

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
    const fragment = document.createDocumentFragment(); 
    loadingIndicator.style.display = 'none';
    timesSalvos.forEach((element) => {
        const containerItem = document.createElement('li');
        containerItem.classList.add('time-item');
        containerItem.innerHTML = `
            <img src="${element.icon}" alt="${element.abreviacao}">
            <p>${element.abreviacao}</p>
        `;
        containerItem.dataset.index = element.id;
        fragment.appendChild(containerItem);

        containerItem.onclick = function(){
            IntoTeam(element);
        }
    });

    containerExibirTimes.appendChild(fragment); 
};

const IntoTeam = (time) =>{
    sidebarMaratona.classList.remove('show'); 
    sidebarMaratona.classList.add('hide'); 
    sidebarTime.classList.remove('hide');
    sidebarTime.classList.add('show');

    criacaoParticipante.classList.add('show');

    const imagemTime = document.getElementById('imagemTime');
    imagemTime.src = time.icon;

    document.getElementById("BackToMaratona").onclick = function(){
        sidebarTime.classList.remove('show');
        sidebarTime.classList.add('hide');
        sidebarMaratona.classList.remove('hide');
        sidebarMaratona.classList.add('show');

        criacaoParticipante.classList.remove('show');

    }

    document.getElementById("editorTimeButton").onclick = function(){
        EditarTime(time);
    }
}

const EditarTime = (time) =>{
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

    document.getElementById('containerArredondadoEditaTime').onclick = function () {
        inputImagemTime.click();
    };

    document.getElementById('inputImagemTimeEditar').onchange = function (event) {
        const arquivo = event.target.files[0];
        if (arquivo) {
            const urlImagem = URL.createObjectURL(arquivo);
            imgElement.style.width = "100%";
            imgElement.src = urlImagem;
        }
    };

    botaoEditar.onclick = async function(event){
        event.preventDefault();
        const data = new FormData();
        data.append("NovoNomeTime", nomeTime.value);
        data.append("NovaAbreviacao",abreviacaoTime.value);
        data.append("id",time.id);
        data.append("NovoEscudoTime",imgElement);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
    }

    botaoExcluir.onclick = async function(event){
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

document.getElementById("fecharCriacaoTime").onclick = function () {
    criacaoTimeScreen.classList.remove('show');
    overlayIntoMaratona.classList.remove('show');
    intoMaratona.classList.remove("no-scroll");
}

const EditarMaratona = (element) => {
    const inputNomeMaratona = document.getElementById("novoNomeMaratona");
    const inputDescricaoMaratona = document.getElementById("novaDescricaoMaratona");
    const inputQtdTimesMaratona = document.getElementById("novaQtdTimesMaratona");
    const inputPremioMaratona = document.getElementById("novoPremioMaratona");
    const botaoEditar = document.getElementById("ConfirmarEdicaoMaratona");
    const botaoExcluir = document.getElementById("ExcluirMaratona");

    editarMaratona.classList.add('show');
    overlayIntoMaratona.classList.add('show');
    intoMaratona.classList.add("no-scroll");

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

backToHome.onclick = function () {
    sidebar.classList.remove('show'); 
    sidebar.classList.add('hide'); 
    intoMaratona.classList.remove('show');
    intoMaratona.classList.add('hide'); 
    setTimeout(function() { // 200ms pro remove do scroll não cortar a animação da IntoMaratona
        container.classList.remove('no-scroll');
    }, 200);
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
    container.classList.remove("no-scroll");
}

fecharEdicaoMaratona.onclick = function () {
    editarMaratona.classList.remove('show');
    overlayIntoMaratona.classList.remove('show');
    intoMaratona.classList.remove("no-scroll");
}

fecharEdicaoConta.onclick = function () {
    screenEdicaoConta.classList.remove('show');
    overlay.classList.remove('show');
    container.classList.remove("no-scroll");
}

editarContaAbrir.onclick = function () {
    screenEdicaoConta.classList.add('show');
    overlay.classList.add('show');
    container.classList.add("no-scroll");

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
            
            // Revoga a antiga pra não sobreescrever
            if (currentImageUrl) {
                URL.revokeObjectURL(currentImageUrl);
            }

            // Nova URL pra atualizar
            currentImageUrl = URL.createObjectURL(arquivo);
            imagemAtualizar.src = currentImageUrl;

        }
    };
};

function mostrarSenha(){
    var inputPass = document.getElementById('newPassword');
    var btnShowPass = document.getElementById('btn-senha');

    if(inputPass.type === 'password'){
        inputPass.setAttribute('type', 'text')
        btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
        }else{
            inputPass.setAttribute('type', 'password')
                btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
        }
    }

criarMaisButton.onclick = function () {
    criacao.classList.add('show');
    overlay.classList.add('show');
    container.classList.add("no-scroll");
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

        containerItem.onclick = function(){
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

const handleMaratonaClick = (index) => {
    const inputNomeMaratona = document.getElementById("novoNomeMaratona");
    const inputDescricaoMaratona = document.getElementById("novaDescricaoMaratona");
    const inputQtdTimesMaratona = document.getElementById("novaQtdTimesMaratona");
    const premioMaratona = document.getElementById("novoPremioMaratona");

    editarMaratona.style.display = "flex";
    container.classList.add("no-scroll");

}