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
    if(len(request.args)==0):
        return render_template('insert.html')
    else:        
        taskName1 = None
        entries2 = None

        for somevar in request.args: 
            if somevar == 'var1':
                taskName1 = request.args[somevar]
            if somevar == 'var2':
                entries2 = request.args[somevar]

        return render_template('insert.html', taskName1=taskName1, entries2=entries2)

if __name__ == '__main__':
    app.run(debug=True)

