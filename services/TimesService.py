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

        query = "SELECT t.id, t.nome_time, t.abreviacao, t.escudo, t.maratonaId FROM times t WHERE t.maratonaId = %s;"
        cursor.execute(query, (maratona_id,))
        data = cursor.fetchall()

        dados = []
        for acc in data:
            if acc['escudo']:
                icon = base64.b64encode(acc['escudo']).decode('utf-8')
            else:
                icon = None

            time_data = {
                'id': acc['id'],
                'nome_time': acc['nome_time'],
                'abreviacao': acc['abreviacao'],
                'maratonaId': acc['maratonaId'],
                'escudo': icon
            }
            dados.append(time_data)

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