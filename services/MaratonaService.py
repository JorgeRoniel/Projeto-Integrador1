from database import conexao as c

def criarMaratona(nome, descricao, qtdTimes, premiacao, userId):
    try:

        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"INSERT INTO maratona (nome_maratona, descricao, qtdTimes, premiacao, userId) VALUES ('{nome}', '{descricao}', {qtdTimes}, '{premiacao}', {userId});")
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False

def atualizarMaratona(id, nome, descricao, qtdTimes, premiacao):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"UPDATE maratona SET nome_maratona='{nome}', descricao='{descricao}', qtdTimes='{qtdTimes}', premiacao='{premiacao}' WHERE id = {id}")
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False


def listarMaratonas(user_id):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"SELECT m.id, m.nome_maratona, m.descricao, m.qtdTimes, m.premiacao FROM maratona m INNER JOIN usuario u ON m.userId = u.id WHERE u.id = {user_id};")
        data = cursor.fetchall()

        return data
    except Exception as e:
        print(e)
        return []

def deletarMaratona(id):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"DELETE FROM maratona WHERE id = {id}")
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False

#criarMaratona('maratona_Teste', 'muito legal', 8, '100', 7)