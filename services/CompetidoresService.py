from database import conexao as c

def inserirCompetidores(nome, timeId):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"INSERT INTO competidores (nome_competidor, timeId) VALUES ('{nome}', {timeId})")
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False
    
def listarCompetidores(id_time):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        sql =  "SELECT c.nome_competidor FROM competidores c INNER JOIN times t ON t.id = %s;"

        cursor.execute(sql, (id_time))
        data = cursor.fetchall()

        conn.close()
        return data
    except Exception as e:
        print(e)
        return []

def atualizarCompetidores(id_comp, novo_nome):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        sql = "UPDATE competidores SET nome_competidor=%s WHERE id = %s;"

        cursor.execute(sql, (novo_nome, id_comp))
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False

def deletarCompetidor(id_comp):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        sql = "DELETE FROM competidores WHERE id = %s;"

        cursor.execute(sql, (id_comp))
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False