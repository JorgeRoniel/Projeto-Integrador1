import re
from database import conexao as c
#Pegar dados do banco(Por agr ta só pegando da mesa Accounts)
def captureAccounts(connection):

    with connection.cursor() as cursor:
            nick = []
            email = []
            passw = []
            num = []

            sql = "SELECT * FROM `accounts`"
            cursor.execute(sql)

            datadic = cursor.fetchall()

            for acc in datadic:
                nick.append(acc.get('nickname', 'N/A'))
                email.append(acc.get('email', 'N/A'))
                passw.append(acc.get('password', 'N/A'))
                num.append(acc.get('id', 'N/A'))

            accounts = [nick, email, passw, num]
            return accounts
    
def insertAccount(nome, email, passw):
    try:
        connection = c.openBD()
        cursor = connection.cursor()

        if verifyPass(passw):
            cursor.execute(f"INSERT INTO usuario(nome, email, senha) VALUES ('{nome}', '{email}', '{passw}');")
            connection.commit()
            connection.close()
            return True
        else:
            return False
    except NameError:
        return False

#Criação de Contas.
def login(email, senha):
    try:
        connection = c.openBD()
        cursor = connection.cursor()

        cursor.execute(f"SELECT email, senha FROM usuario a WHERE a.email = '{email}' AND a.senha = '{senha}'")
        data = cursor.fetchall()

        for acc in data:
            if acc['email'] == email and acc['senha'] == senha:
                return True
            else:
                return False
    except NameError as e:
        print(e)

def updateAccount(id, novoNome, novoEmail, novaSenha):
    try:
        connection = c.openBD()
        cursor = connection.cursor()

        if verifyPass(novaSenha):
            cursor.execute(f"UPDATE usuario SET nome='{novoNome}', email='{novoEmail}', senha='{novaSenha}' WHERE id = {id}")
            connection.commit()
            connection.close()
            
            print('yes')
    except Exception as e:
        print(e)

def deleteAccount(id):
    try:
        connection = c.openBD()
        cursor = connection.cursor()

        cursor.execute(f"DELETE FROM usuario WHERE id = {id}")
        connection.commit()
        connection.close()
        print("yes")
    except Exception as e:
        print(Exception)
    
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
