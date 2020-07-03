import flask
from flask import render_template, request
from mysql.connector import *

app = flask.Flask(__name__)
app.config["DEBUG"] = True

def getDisplayAll():
    conn = connect(host="localhost", user="root", password="root", db="massdb")
    mycursor = conn.cursor()
    query = 'select * from apitable'
    mycursor.execute(query)
    records = mycursor.fetchall()
    return records

def getDisplayById(id):
    conn = connect(host="localhost", user="root", password="root", db="massdb")
    mycursor = conn.cursor()
    query = 'select * from apitable where id = %s'
    ip = (id,)
    mycursor.execute(query, ip)
    records = mycursor.fetchall()
    return records

def getInsertRecord(id, name):
    conn = connect(host="localhost", user="root", password="root", db="massdb")
    mycursor = conn.cursor()
    query = 'insert into apitable values(%s, %s)'
    ip = (id, name)
    mycursor.execute(query, ip)
    conn.commit()
    return mycursor.rowcount

@app.route('/', methods=['GET'])
def getHome():
    return render_template('home.html')

@app.route('/insert', methods=['POST', 'GET'])
def getInsert():
    if request.method == 'POST':
        id = request.form.get('id', type = int)
        name = request.form.get('name', type = str)

        if id is not None and name is not None:
            if(getInsertRecord(id, name)>0):
                records = getDisplayAll()
                return render_template('insert.html', records=records)
            else:
                return "Error : while Inserting"
        else:
            records = getDisplayAll()
            return render_template('insert.html', records=records)
    else:
        records = getDisplayAll()
        return render_template('insert.html', records=records)


@app.route('/search', methods=['GET'])
def getSearch():
    id = request.args.get('id', type = int)

    if id is None:
        records = getDisplayAll()
        return render_template('search.html', records=records)
    else:
        records = getDisplayById(id)
        return render_template('search.html', records=records)

if __name__ == '__main__':
    app.run()

