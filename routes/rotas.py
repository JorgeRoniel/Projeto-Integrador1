from flask import Blueprint, render_template, request, redirect, jsonify, session
from database import Models
from services import UserServices as s
from services.UserServices import verifyPass
from services import MaratonaService as m
from services import TimesService as t
from services import CompetidoresService as cs
import base64

rotas = Blueprint('rotas', __name__)

@rotas.route('/')
def login_page():
    return render_template('login.html')

icon = None
@rotas.route('/submit', methods=['POST'])
def submit():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()
    
    global icon
    user = Models.User(None, data['senha'], data['email'])
    user_dados = s.login(user.email, user.password)
    if user_dados is not None:
        session['user_id'] = user_dados['id']
        session['email'] = user_dados['email']
        session['username'] = user_dados['username']
        session['senha'] = user_dados['senha']
        icon = user_dados['icon']
        response = {
            'status': 'success'
        }
    else:
        response = {
            'status': 'error'
        }
    
    return jsonify(response)

@rotas.route('/create', methods=['POST'])
def create_user():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()
    
    user = Models.User(data['novoNome'], data['novaSenha'], data['novoEmail'])

    if(verifyPass(user.password)):
        if s.insertAccount(user.username, user.email, user.password):
            response = {
                "status":'success',
                "message": "created!"
            }
        else:
            response = {
                "status": "error",
                "message": "ERROR"
            }
    else:
        response = {
            "status": "wrongPass",
            "message": "Senha fora de Padrão"
        }

    return jsonify(response)

@rotas.route("/updateUser", methods=['PUT'])
def update_user():
    nome = request.form.get('Nome')
    email = request.form.get('Email')
    senha = request.form.get('Senha')

    image_blob = None
    if 'iconPerfil' in request.files:
        image_file = request.files['iconPerfil']
        if image_file.filename == '':
            image_file = None
        else:
            image_blob = image_file.read()
            global icon
            icon = base64.b64encode(image_blob).decode('utf-8')
    
    user_id = session.get('user_id')
    user = Models.User(nome, senha, email)
    

    if s.updateAccount(user_id, user.username, user.email, user.password, image_blob) == 'sucess':
        response = {
            "status": "success",
            "message": "updated!"
        }
    elif s.updateAccount(user_id, user.username, user.email, user.password, image_blob) == 'N/A':
        response = {
            "status": "passInvalid",
            "message": "Senha fora de Padrão!"
        }
    else:
        response = {
            "status": "error"
        }
    
    return jsonify(response)

@rotas.route("/deleteUser", methods=['DELETE'])
def delete_user():
    user_id = session.get('user_id')

    if s.deleteAccount(user_id):
        response = {
            "status": "sucess",
            "message": "Deleted!"
        }
    else:
        response = {
            "status": "error"
        }
    
    session.clear()
    return jsonify(response)

@rotas.route("/user", methods=['GET'])
def return_userData():
    response = {
        'user_id': session.get('user_id'),
        'username': session.get('username'),
        'email': session.get('email'),
        'icon': icon
    }

    return jsonify(response)

@rotas.route('/home')
def home():
    return render_template('home.html')

@rotas.route('/createMarathon', methods=['POST'])
def create_marathon():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()

    maratona = Models.Marathon(data['nomeMaratona'], data['qtdTimes'], data['valor'], None)
    user_id = session.get('user_id')

    if user_id is not None:
        if m.criarMaratona(maratona.name, data['Descricao'], maratona.numTeam, maratona.prize, user_id):
            response = {
                "status": "success",
                "message": "created!"
            };
        else:
            response = {
                "status": "error",
                "message": "não foi criado."
            };
    else:
        response = {
            "status": "N/A",
            "message": "not authenticate"
        }

    return jsonify(response)

@rotas.route("/maratonas", methods=['GET'])
def show_marathons():
    user_id = session.get('user_id')

    data = m.listarMaratonas(user_id)

    return jsonify(data)

@rotas.route("/updateMaratona", methods=['PUT'])
def update_marathon():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()

    maratona = Models.Marathon(data['nome_maratona'], data['qtdTimes'], data['premiacao'], None)
    if m.atualizarMaratona(data['id'], maratona.name, data['descricao'], maratona.numTeam, maratona.prize):
        response = {
            'status': 'success',
            'message': 'updated!'
        }
    else:
        response = {
            'status': 'error',
            'message': 'erro ao atualizar maratona!'
        }

    return jsonify(response)

@rotas.route("/deleteMaratona", methods=['DELETE'])
def delete_marathon():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()
    
    id = data['id']
    if m.deletarMaratona(id):
        response = {
            "status": "success",
            "message": "Maratona Deletada."
        }
    else:
        response = {
            "status": "error",
            "message": "Erro ao deletar."
        }
    
    return jsonify(response)

@rotas.route("/criarTime", methods=['POST'])
def create_team():
    nome_time = request.form.get('nomeTime')
    abreviacao = request.form.get('Abreviacao')
    id_maratona = request.form.get('idMaratona')
    icon_blob = None

    if 'escudoTime' in request.files:
        image_file = request.files['escudoTime']
        if image_file.filename == '':
            image_file = None
        else:
            icon_blob = image_file.read()
    
    time = Models.Team(nome_time, icon_blob, abreviacao, None)

    if t.criarTime(time.shield, time.name, time.nick, id_maratona):
        response = {
            'status': 'success',
            'message': 'Time Criado!'
        }
    else:
        response = {
            'status': 'error',
            'message': 'Erro ao criar time!'
        }
    
    return response


@rotas.route("/getTimes", methods=['POST'])
def showTeams():
    id = request.form.get('maratona_id')

    data = t.listarTimes(id)

    return jsonify(data)

@rotas.route("/updateTime", methods=['PUT'])
def updateTeam():
    nome_time = request.form.get('NovoNomeTime')
    abreviacao = request.form.get('NovaAbreviacao')
    id_time = request.form.get("id")

    icon_blob = None

    if 'NovoEscudoTime' in request.files:
        image_file = request.files['NovoEscudoTime']
        if image_file.filename == '':
            image_file = None
        else:
            icon_blob = image_file.read()
    
    time = Models.Team(nome_time, icon_blob, abreviacao, None)

    if t.atualizarTime(id_time, time.name, time.nick, time.shield):

        response = {
            "status": "success",
            "message": "Time Atualizado!"
        }
    else:
        response = {
            "status": "erro",
            "message": "Erro ao atualizar time!"
        }
    
    return jsonify(response)


@rotas.route("/deleteTime", methods=['DELETE'])
def deleteTeam():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()
    
    id_time = data['id']
    if t.deletarTime(id_time):
        response = {
            "status": "success",
            "message": "Time deletado!"
        }
    else:
        response = {
            "status": "erro",
            "message": "Erro ao deletar time."
        }
    
    return jsonify(response)

@rotas.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@rotas.route('/createCompetidor', methods=['POST'])
def create_Competidor():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()

    competidor = Models.Player(data['nomeJogador'], data['timeId'])
    time_id = session.get('time_id')

    if time_id is not None:
        if cs.inserirCompetidores(competidor.name, competidor.teamId):
            response = {
                "status": "success",
                "message": "created!"
            };
        else:
            response = {
                "status": "error",
                "message": "não foi criado."
            };
    else:
        response = {
            "status": "N/A",
            "message": "not authenticate"
        }

    return jsonify(response)

@rotas.route("/competidor", methods=['GET'])
def show_Competidor():
    time_id = session.get('time_id')

    data = cs.listarCompetidores(time_id)

    return jsonify(data)

@rotas.route("/updateCompetidor", methods=['PUT'])
def update_Competidor():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()

    competidor = Models.Player(data['nomeJogador'], data['timeId'])
    if cs.atualizarCompetidores(data['id'], competidor.name, competidor.teamId):
        response = {
            'status': 'success',
            'message': 'updated!'
        }
    else:
        response = {
            'status': 'error',
            'message': 'erro ao atualizar maratona!'
        }

    return jsonify(response)

@rotas.route("/deleteCompetidor", methods=['DELETE'])
def delete_Competidor():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()
    
    id = data['id']
    if cs.deletarCompetidor(id):
        response = {
            "status": "success",
            "message": "Maratona Deletada."
        }
    else:
        response = {
            "status": "error",
            "message": "Erro ao deletar."
        }
    
    return jsonify(response)
