from flask import Blueprint, render_template, request, redirect, jsonify
from database import Models
from services import UserServices as s
from services.UserServices import verifyPass

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
    
    if s.login(user.email, user.password):
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
    response = {
        "status": "success",
        "message": "tudo ligado!"
    };

    return jsonify(response)

@rotas.route('/logout')
def logout():
    return redirect('/')