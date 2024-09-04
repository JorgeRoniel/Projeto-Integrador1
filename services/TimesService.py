from database import conexao as c
import base64

def criarTime(escudo, nome, abreviacao, maratona_id):
    try:
        conn = c.openBD()
        cursor = conn.cursor()
        query = "INSERT INTO times(nome_time, abreviacao, escudo, maratonaId) VALUES (%s, %s, %s, %s);"

        cursor.execute(query, (nome, abreviacao, escudo, maratona_id))
        conn.commit()
        conn.close()
        return True

    except Exception as e:
        print(e)
        return False

def atualizarTime(id, nome, abreviacao, escudo):
    try:
        conn = c.openBD()
        cursor = conn.cursor()
        query = "UPDATE times SET nome_time=%s, abreviacao=%s, escudo=%s WHERE id = %s;"

        cursor.execute(query, (nome, abreviacao, escudo,  id))
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False

def listarTimes(maratona_id):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"SELECT t.nome_time, t.abreviacao, t.escudo FROM times t INNER JOIN maratonas m ON t.id = {maratona_id};")
        data = cursor.fetchall()

        dados = {}
        for acc in data:
            if acc['escudo']:
                icon = base64.b64encode(acc['escudo']).decode('utf-8')
            else:
                icon = None

            dados['nome_time'] = acc['nome_time']
            dados['abreviacao'] = acc['abreviacao']
            dados['escudo'] = icon

            return dados
    except Exception as e:
        print(e)
        return []

def deletarTime(id):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"DELETE FROM times WHERE id = {id}")
        conn.commit()
        conn.close()
        
        return True
    except Exception as e:
        print(e)
        return False