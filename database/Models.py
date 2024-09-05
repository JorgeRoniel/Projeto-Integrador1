import datetime as dt
import re

class User:
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

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

#classe dos times
class Team:
    def __init__(self, name, shield, nick, teamMates):
        self.name = name
        self.shield = shield
        self.nick = nick
        self.teamMates = teamMates

class Player:
    def __init__(self, name, teamId):
        self.name = name
        self.teamId = teamId
        
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
