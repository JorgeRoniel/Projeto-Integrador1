import re;
from database import conexao as c
import base64
    
def insertAccount(nome, email, passw):
    try:
        connection = c.openBD()
        cursor = connection.cursor()
        with open('static/img/InitProfile.png', 'rb') as file:
            imageProfile = file.read()

        if verifyPass(passw):
            query = """
            INSERT INTO usuario (nome_user, email, senha, avatar) 
            VALUES (%s, %s, %s, %s);
            """
            cursor.execute(query, (nome, email, passw, imageProfile))
            connection.commit()
            connection.close()
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False

#Criação de Contas.
def login(email, senha):
    try:
        connection = c.openBD()
        cursor = connection.cursor()

        cursor.execute(f"SELECT id, nome_user, email, senha, avatar FROM usuario a WHERE a.email = '{email}' AND a.senha = '{senha}'")
        data = cursor.fetchall()

        dados = {}
        for acc in data:
            if acc['email'] == email and acc['senha'] == senha:
                if acc['avatar']:
                    icon = base64.b64encode(acc['avatar']).decode('utf-8')
                else:
                    icon = None

                dados['id'] = acc['id']
                dados['username'] = acc['nome_user']
                dados['email'] = acc['email']
                dados['senha'] = acc['senha']
                dados['icon'] = icon

                return dados
            else:
                return None
    except Exception as e:
        print(e)

def updateAccount(id, novoNome, novoEmail, novaSenha, icon):
    mensagem = ""
    try:
        connection = c.openBD()
        cursor = connection.cursor()

        if verifyPass(novaSenha):
            query = "UPDATE usuario SET nome_user=%s, email=%s, senha=%s, avatar=%s WHERE id = %s"
            cursor.execute(query, (novoNome, novoEmail, novaSenha, icon, id))
            connection.commit()
            connection.close()
            mensagem = "sucess"
            return mensagem
        else:
            mensagem = "passInvalid"
            return mensagem
    except Exception as e:
        print(e)
        mensagem = "error"
        return mensagem

def deleteAccount(id):
    try:
        connection = c.openBD()
        cursor = connection.cursor()

        cursor.execute(f"DELETE FROM usuario WHERE id = {id}")
        connection.commit()
        connection.close()
        
        return True
    except Exception as e:
        print(e)
        return False
    
def verifyPass(passw):
    # Pelo menos uma letra maiúscula
    if not re.search(r'[A-Z]', passw):
        return False
    
    # Pelo menos uma letra minúscula
    if not re.search(r'[a-z]', passw):
        return False

    # Pelo menos um número
    if not re.search(r'[0-9]', passw):
        return False

    # Pelo menos 8 caracteres
    if len(passw) <= 8:
        return False
    
    return True