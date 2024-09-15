from database import conexao as c
from Estruturas import ArvoreBinaria as ar
from database import Models as m

def criarCompeticao(data_partida, local, id_time1, id_time2, id_vencedor, maratonaId):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"INSERT INTO partidas (data_partida, local_partida, time1, time2, vencedor, maratonaId) VALUES ('{data_partida}', '{local}', {id_time1}, {id_time2}, {id_vencedor}, {maratonaId});")
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False

def atualizarCompetição(id, nova_data, novo_local, novo_time1, novo_time, novo_vencedor):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        sql = "UPDATE partidas SET data_partida=%s, local_partida=%s, time1=%s, time2=%s, vencedor=%s WHERE id = %s;"

        cursor.execute(sql, (nova_data, novo_local, novo_time1, novo_time, novo_vencedor, id))
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False

def listarCompeticoes(id_maratona):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        cursor.execute(f"SELECT p.data_partida, p.local_partida, p.time1, p.time2 FROM partidas p INNER JOIN maratona m ON m.id = {id_maratona};")
        data = cursor.fetchall()

        arvore = ar.ArvoreBinaria()

        for dado in data:
            partida = m.Match(dado['data_partida'], dado['local_partida'], dado['time1'], dado['time2'], dado['vencedor'])
            arvore.inserir(partida)

        return arvore
    except Exception as e:
        print(e)
        return []

def deletarCompeticao(id_partida):
    try:
        conn = c.openBD()
        cursor = conn.cursor()

        sql = "DELETE FROM competidores WHERE id = %s;"

        cursor.execute(sql, (id_partida))
        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(e)
        return False
