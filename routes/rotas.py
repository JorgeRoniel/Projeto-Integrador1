from flask import Blueprint, render_template, request, redirect, jsonify

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
    
    response = {
        'status': 'success',
        'message': 'created!',
        'User': {
            'nome': data['novoNome'],
            'email': data['novoEmail'],
            'senha': data['novaSenha']
        }
    }

    return jsonify(response)

@rotas.route('/teste')
def teste():
    return render_template('home.html')