from flask import Blueprint, render_template, request, redirect, jsonify, session
from database import Models
from services import UserServices as s
from services.UserServices import verifyPass
from services import MaratonaService as m

rotas = Blueprint('rotas', __name__)

@rotas.route('/')
def login_page():
    return render_template('login.html')

@rotas.route('/submit', methods=['POST'])
def submit():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()
    
    user = Models.User(None, data['senha'], data['email'])
    user_id = s.login(user.email, user.password)
    if user_id is not None:
        session['user_id'] = user_id
        session['email'] = user.email
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


@rotas.route('/logout')
def logout():
    session.clear()
    return redirect('/')