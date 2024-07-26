from database import conexao as c

def criarMaratona(nome, descricao, qtdTimes, premiacao, userId):
    try:

        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"INSERT INTO maratona (nome, descricao, qtdTimes, premiacao, userId) VALUES ('{nome}', '{descricao}', {qtdTimes}, '{premiacao}', {userId});")
        conn.commit()
        conn.close()

        print('1')
    except Exception as e:
        print(e)

def atualizarMaratona(id, nome, descricao, qtdTimes, premiacao):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"UPDATE maratonas SET nome='{nome}', descricao='{descricao}', qtdTimes='{qtdTimes}', premiacao='{premiacao}' WHERE id = {id}")
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

        cursor.execute(f"SELECT m.nome, m.descricao, m.qtdTimes, m.premiacao FROM maratona m INNER JOIN usuario u ON m.userId = u.id;")
        data = cursor.fetchAll()

        nomes = []
        descricao = []
        qtdTimes = []
        premiacoes = []


        for maratonas in data:
            nomes.append(maratonas.get('m.nome'))
            descricao.append(maratonas.get('m.descricao'))
            qtdTimes.append(maratonas.get('m.qtdTimes'))
            premiacoes.append(maratonas.get('m.premiacao'))
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