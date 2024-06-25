from flask import Blueprint, render_template, request, redirect, jsonify
from database import main

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
    
    if data['email'] == 'email@mail.com' and data['senha'] == '12345678':
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

    #Essa linha comentada é pra quando tiver a conexão com bd, comentei p não quebrar.
    '''
    if main.insertAccount(data['novoNome'], data['novoEmail'], data['novaSenha']):
        response = {
            "status":"success",
            "message": "created!"
        }
    else:
        response = {
            "status": "error",
            "message": "ERROR"
        }
    '''
    response = {
        "status": "success",
        "message": "created!"
    }

    return jsonify(response)

@rotas.route('/home')
def home():
    return render_template('home.html')

@rotas.route('/logout')
def logout():
    return redirect('/')