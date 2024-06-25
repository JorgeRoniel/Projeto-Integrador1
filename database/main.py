import datetime as dt
import pymysql
import re

#Função para abri o banco de dados
def openBD():
    try:
        connection = pymysql.connect(host='',
                                user='',
                                password='',
                                database='',
                                port=0,
                                cursorclass=pymysql.cursors.DictCursor)
        print('Conectado ao banco!')
        return connection
    except NameError as e:
        print(e)
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
    
def insertAccount(nick, email, passw):
    try:
        connection = openBD()
        cursor = connection.cursor()

        cursor.execute(f"INSERT INTO accounts(nickname, email, senha) VALUES ('{nick}', '{email}', '{passw}');")
        connection.commit()
        return True
    except NameError:
        return False

#Criação de Contas.
def signIn(connection):
    email = input("Coloque seu email: ")
    emailcon = input("Confirme seu email: ")

    while(email != emailcon):
        print("Os emails não são iguais, coloque-os novamente: ")
        email = input("Coloque seu email: ")
        emailcon = input("Confirme seu email: ")
    
    nick = input("Digite seu apelido: ")
    with connection.cursor() as cursor:
        sql = "SELECT * FROM `accounts` WHERE `nickname`=%s"
        cursor.execute(sql, (nick,))
        result = cursor.fetchone()
        while(result is not None):
            nick = input("Digite outro apelido: ")
            sql = "SELECT * FROM `accounts` WHERE `nickname`=%s"
            cursor.execute(sql, (nick,))
            result = cursor.fetchone()

    passw = input("Digite sua senha: \nNela deve conter:\n->Ao menos uma letra maiúscula\n->Ao menos uma letra minúscula\n->Ao menos um número\n->Ao menos 8 caracteres\n")
    
    while(not verifyPass(passw)):
        passw = input("Sua senha não cumpre os requisitos, ensira novamente: ")

    insertAccount(connection, nick, email, passw)
    return True
    
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

#login
class User:
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
    
    def validation(username, password):
        if username == "admin" and password == "admin":
            return True
        
        else:
            return False

#classe da maratona
class Marathon:
    def __init__(self, name, numTeam, prize, matches):
        self.name = name
        self.numTeam = int(numTeam)
        self.prize = float(prize)
        self.matches = matches #fazer uma calculadora pra cá dps.

#classe da partida
class Match:
    def __init__(self, date, hour, local, blueTeam, redTeam, score, timeOfScore, stats):
        self.date = date
        self.hour = hour
        self.local = local
        self.blueTeam = blueTeam
        self.redTeam = redTeam
        self.score = score
        self.timeOfScore = timeOfScore
        self.stats = stats

#classe do momento da pontuação
class TimeOfScore:
    def __init__(self, who, when):
        self.who = who
        self.when = when

#classe dos times
class Team:
    def __init__(self, name, shield, nick, teamMates):
        self.name = name
        self.shield = shield
        self.nick = nick
        self.teamMates = teamMates

#definição de arvore e da classe para arvore de chaveamento
class NoArvore:
    def __init__(self, Match=None):
        self.Match = Match
        self.left = None
        self.right = None

class ChaveamentoArvore:
    def __init__(self):
        self.root = None

    def insert_match(self, match):
        if not self.root:
            self.root = NoArvore(match)
        else:
            self._insert_match(match, self.root)

    def _insert_match(self, match, no_atual):
        if not no_atual.left:
            no_atual.left = NoArvore(match)
        elif not no_atual.right:
            no_atual.right = NoArvore(match)
        else:
            # Se ambos os lados estão ocupados, descemos recursivamente em um dos lados
            self._insert_match(match, no_atual.left)

    def print_chaveamento(self):
        self._print_chaveamento(self.root)

    def _print_chaveamento(self, no_atual):
        if no_atual:
            print("Partida:", no_atual.Match.blueTeam, "vs", no_atual.Match.redTeam)
            self._print_chaveamento(no_atual.left)
            self._print_chaveamento(no_atual.right)

def retirar_trecho(original, inicio, fim):
    """
    Remove o trecho da string original entre as posições de início e fim (não inclusivo).
    
    Parâmetros:
    original (str): A string original.
    inicio (int): A posição inicial do trecho a ser removido.
    fim (int): A posição final do trecho a ser removido (não inclusivo).
    
    Retorna:
    str: A string resultante após a remoção do trecho.
    """
    trecho_removido = original[inicio:fim]

    return trecho_removido


#main
if __name__ == "__main__":
    # Exemplo de uso:
    #chaveamento = ChaveamentoArvore()

    # Criando partidas
    #partida1 = Match("11:00", "11:00", "Crateús", "CC", "SI", "None", "None", "None")
    #partida2 = Match("11:00", "11:00", "Sobral", "ADS", "EC", "None", "None", "None")
    #partida3 = Match("11:00", "11:00", "Sobral", "CC", "ADS", "None", "None", "None")

    # Inserindo partidas na árvore
    #chaveamento.insert_match(partida1)
    #chaveamento.insert_match(partida2)
    #chaveamento.insert_match(partida3)

    # Imprimindo chaveamento
    #chaveamento.print_chaveamento()
    
    
    #signIn(conn)
    #insertAccount(conn, nick, email, passw)
    insertAccount("Jorge", "jorge@email.com", "123")



    # Exemplo de uso:
    #string_original = data[1]
    #posicao_inicio = 13
    #posicao_fim = len(string_original)

    #nova_string = retirar_trecho(string_original, posicao_inicio, posicao_fim)
    #print(nova_string)
    
    
    
