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
    return firebase.get('/tasks',None)

@app.route('/', methods=['GET'])
def getHome():
    return render_template("home.html")     #template inside templates


@app.route('/display-all', methods=['GET'])
def getDisplayAll():
    records = displayAll()
    print(records)
    return jsonify(records)

@app.route('/add',methods=['POST','GET'])
def getAdd():
    if request.method == 'POST':
        taskname = request.form.get('taskname', type=str)
        entryname = request.form.get('entryname', type=str)

        data = [{'taskname': taskname, 'entryname': entryname}]
        # print(data)
        result=firebase.post('/tasks', data)
        print(jsonify(result))

        if taskname is not None and entryname is not None:
            if (result['name'] is not None):
                return redirect('http://127.0.0.1:5000/display-all')
            else:
                return "Error - Not inserted"
        else:
            return render_template('insert.html')
    else:
        return render_template('insert.html')

if __name__ == '__main__':
    app.run()

