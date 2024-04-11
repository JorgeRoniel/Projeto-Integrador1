from flask import Flask
from routes.rotas import rotas

app = Flask(__name__)
app.register_blueprint(rotas)

app.run(debug=True)