import flask
from flask import request, jsonify, render_template, redirect, url_for

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def getLogin():
    return render_template("login.html")

@app.route('/home', methods=['GET'])
def getHome():
    return render_template("home.html")  

if __name__ == '__main__':
    app.run()

