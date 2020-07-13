from firebase import firebase
import flask
from flask import request, jsonify, render_template, redirect, url_for
import pymongo

client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client['tododb']
collection = db['mycollection']


firebase = firebase.FirebaseApplication("https://todo-8a912.firebaseio.com/", None)



app = flask.Flask(__name__)
app.config["DEBUG"] = True

def displayAll():
    return collection.find({}, {'_id': 0})

@app.route('/', methods=['GET'])
def getHome():
    return render_template("home.html")     #template inside templates


@app.route('/display-all', methods=['GET'])
def getDisplayAll():
    records = displayAll()
    return jsonify(list(records))

@app.route('/add',methods=['POST','GET'])
def getAdd():
    if request.method == 'POST':
        id = request.form.get('id', type=int)
        name = request.form.get('name', type=str)

        data = [{'id': id, 'name': name}]
        result=firebase.post('/todo-8a912/Task', data)
        print(result)

        if id is not None and name is not None:
            if (len(collection.insert(data)) > 0):
                return redirect('http://127.0.0.1:5000/display-all')
            else:
                return "Error - Not inserted"
        else:
            return render_template('insert.html')
    else:
        return render_template('insert.html')

if __name__ == '__main__':
    app.run()

