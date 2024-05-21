from flask import Blueprint, render_template, request, redirect

rotas = Blueprint('rotas', __name__)

@rotas.route('/')
def login_page():
    return render_template('login.html')

@rotas.route('/', methods=['POST'])
def submit():

    return redirect('/')

@rotas.route('/', methods=['POST'])
def create_user():

    return redirect('/')