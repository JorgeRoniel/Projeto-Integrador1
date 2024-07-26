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
    
    if s.login(data['email'], data['senha']):
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

    if(verifyPass(data['novaSenha'])):
        if s.insertAccount(data['novoNome'], data['novoEmail'], data['novaSenha']):
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

@rotas.route('/logout')
def logout():
    return redirect('/')