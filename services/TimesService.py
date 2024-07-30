from database import conexao as c

def criarTime(nome, abreviacao, maratona_id):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"INSERT INTO times(nome_time, abreviacao, maratonaId) VALUES ('{nome}', '{abreviacao}', {maratona_id});")
        conn.commit()
        conn.close()
        print('1')

    except Exception as e:
        print(e)

def atualizarTime(id, nome, abreviacao):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"UPDATE times SET nome_time='{nome}', abreviacao='{abreviacao}' WHERE id = {id}")
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

def listarTimes():
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"SELECT t.nome_time, t.abreviacao, c.nome_competidor FROM times t INNER JOIN competidores c ON t.id = c.timeId;")
        data = cursor.fetchall()

        nomes = []
        abreviacoes = []
        competidores = []

        for times in data:
            nomes.append(times.get('nome_time'))
            abreviacoes.append(times.get('abreviacao'))
            competidores.append(times.get('nome_competidor'))
        dados = [nomes, abreviacoes, competidores]
        print(dados)
    except Exception as e:
        print(e)

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

listarTimes()