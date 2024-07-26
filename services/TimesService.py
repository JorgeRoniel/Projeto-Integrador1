from database import conexao as c

def criarTime(nome, abreviacao, maratona_id):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"INSERT INTO times(nome, abreviacao, maratonaId) VALUES ('{nome}', '{abreviacao}', {maratona_id});")
        conn.commit()
        conn.close()
        print('1')

    except Exception as e:
        print(e)

def atualizarTime(id, nome, abreviacao):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"UPDATE times SET nome='{nome}', abreviacao='{abreviacao}' WHERE id = {id}")
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

        cursor.execute(f"INSERT INTO competidores (nome, timeId) VALUES ('{nome}', {timeId})")
        conn.commit()
        conn.close()

        print('1')
    except Exception as e:
        print(e)

def listarTimes():
    conn = c.openBD()
    cursor = conn.cursor()

    cursor.execute(f"SELECT t.nome, t.abreviacao, c.nome FROM times t INNER JOIN competidores c ON t.id = c.timeId;")
    data = cursor.fetchAll()

    nomes = []
    abreviacoes = []
    competidores = []

    for times in data:
        nomes.append(times.get('t.nome'))
        abreviacoes.append(times.get('t.abreviacao'))
        competidores.append(times.get('c.nome'))
    dados = [nomes, abreviacoes, competidores]
    print(dados)

    

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