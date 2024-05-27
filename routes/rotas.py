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
    
    response = {
        'status':'success',
        'user': {
            'email': data['email'],
            'nome': 'Jorge'
        }
    }
    return jsonify(response)

@rotas.route('/create', methods=['POST'])
def create_user():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()
    
    nome = data.get('novoNome')
    print(nome)
    return redirect('/')

@rotas.route('/teste')
def teste():
    return render_template('teste.html')