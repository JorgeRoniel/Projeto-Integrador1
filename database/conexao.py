import pymysql

def openBD():
    try:
        connection = pymysql.connect(host='',
                                user='',
                                password='',
                                database='',
                                port=0,
                                cursorclass=pymysql.cursors.DictCursor)
        print('Conectado ao banco!')
        return connection
    except NameError as e:
        print(e)