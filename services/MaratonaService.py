from database import conexao as c

def criarMaratona(nome, descricao, qtdTimes, premiacao, userId):
    try:

        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"INSERT INTO maratona (nome_maratona, descricao, qtdTimes, premiacao, userId) VALUES ('{nome}', '{descricao}', {qtdTimes}, '{premiacao}', {userId});")
        conn.commit()
        conn.close()

        print('1')
    except Exception as e:
        print(e)

def atualizarMaratona(id, nome, descricao, qtdTimes, premiacao):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"UPDATE maratonas SET nome_maratona='{nome}', descricao='{descricao}', qtdTimes='{qtdTimes}', premiacao='{premiacao}' WHERE id = {id}")
        conn.commit()
        conn.close()

        print('up')
        return True
    except Exception as e:
        print(e)
        return False

def listarMaratonas():
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"SELECT m.nome_maratona, m.descricao, m.qtdTimes, m.premiacao FROM maratona m INNER JOIN usuario u ON m.userId = u.id;")
        data = cursor.fetchall()

        nomes = []
        descricao = []
        qtdTimes = []
        premiacoes = []


        for maratonas in data:
            nomes.append(maratonas.get('nome_maratona'))
            descricao.append(maratonas.get('descricao'))
            qtdTimes.append(maratonas.get('qtdTimes'))
            premiacoes.append(maratonas.get('premiacao'))
        dados = [nomes, descricao, qtdTimes, premiacoes]
        print(dados)
    except Exception as e:
        print(e)

def deletarMaratona(id):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"DELETE FROM maratona WHERE id = {id}")
        conn.commit()
        conn.close()

        print('del')
    except Exception as e:
        print(e)

#criarMaratona('maratona_Teste', 'muito legal', 8, '100', 7)
listarMaratonas()