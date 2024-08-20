from database import conexao as c

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

def atualizarTime(id, nome, abreviacao):
    try:
        conn = c.openBD()
        cursor = conn.cursor()
        query = "UPDATE times SET nome_time=%s, abreviacao=%s WHERE id = %s;"

        cursor.execute(query, (nome, abreviacao, id))
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False

def inserirCompetidores(nome, timeId):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"INSERT INTO competidores (nome_competidor, timeId) VALUES ('{nome}', {timeId})")
        conn.commit()
        conn.close()

        print('1')
    except Exception as e:
        print(e)

def listarTimes(user_id):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"SELECT t.nome_time, t.abreviacao FROM times t INNER JOIN usuario u ON t.id = {user_id};")
        data = cursor.fetchall()

        return data
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
        print("yes")
    except Exception as e:
        print(Exception)