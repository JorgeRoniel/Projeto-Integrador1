from flask import Blueprint, render_template, request, redirect

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
    
    username = data.get('email')
    password = data.get('senha')
    print(username)
    return redirect('/')

@rotas.route('/create', methods=['POST'])
def create_user():
    if request.content_type == 'application/json':
        data = request.get_json()
    else:
        data = request.form.to_dict()
    
    nome = data.get('novoNome')
    print(nome)
    return redirect('/')