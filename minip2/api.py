import flask
from flask import render_template, request, jsonify, redirect, url_for
import pymongo

app = flask.Flask(__name__)
app.config["DEBUG"] = True

client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client['massdb']
collection = db['mycollection']

def displayAll():
    return collection.find({}, {'_id': 0})

@app.route('/', methods=['GET'])
def getHome():
    return render_template('home.html')

@app.route('/display-all', methods=['GET'])
def getDisplayAll():
    records = displayAll()
    return jsonify(list(records))

@app.route('/search', methods=['GET'])
def getSearch():
    id = request.args.get('id', type = int)

    if id is None:
        return render_template('search.html')
    else:
        records = displayAll()
        for record in records:
            if record['id'] == id:
                return jsonify(record)

        return "No Record Found"

@app.route('/insert', methods=['POST', 'GET'])
def getInsert():
    if request.method == 'POST':
        id = request.form.get('id', type = int)
        name = request.form.get('name', type = str)

        data = [{'id':id, 'name':name}]

        if id is not None and name is not None:
            if(len(collection.insert(data))>0):
                return redirect('http://127.0.0.1:5000/display-all')
            else:
                return "Error - Not inserted"
        else:
            return render_template('insert.html')
    else:
        return render_template('insert.html')

if __name__ == '__main__':
    app.run()

