from firebase import firebase
from flask_cors import CORS, cross_origin
import flask
from flask import request, jsonify, render_template, redirect, url_for

firebase = firebase.FirebaseApplication("https://todo-8a912.firebaseio.com/", None)

app = flask.Flask(__name__)
CORS(app)
# app.config["DEBUG"] = True
# app.debug = True

def displayAll():
    return firebase.get('/collection',None)

@app.route('/', methods=['GET'])
def getLogin():
    return render_template("login.html")     #template inside templates

@app.route('/home', methods=['GET'])
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
        data = request.json
        return jsonify(data)
        # taskname = request.form.get('taskname', type=str)
        # entryname = request.form.get('entryname', type=str)
        # user = 'user1'

        data = [{'entryname': entryname}]
        print(data)
        # result=firebase.post('/collection'+'/'+user+'/'+taskname, data)
        # result = firebase.put('/collection/user1/cricket/-MCCbNQg5MSrq8e3oDUx', 'entryname', 'get bhola')
        result=firebase.post('/collection/user1/cricket', data)
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
    app.run(debug=True)

