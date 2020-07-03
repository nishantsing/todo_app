import flask
from flask import request, jsonify, render_template, redirect, url_for
from db import books

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/home', methods=['GET'])
@app.route('/', methods=['GET'])
def home():
    return render_template("home.html")     #template inside templates

@app.route('/redirectToGoogle', methods=['GET'])
def api_redirect1():
    return redirect("http://www.google.com")

@app.route('/redirectToRelative', methods=['GET'])
def api_redirect2():
    return redirect("/books")     #(/) appends to relative path

@app.route('/myURL/<int:reqid>', methods=['GET'])
def getMyURL(reqid):
    optarg=None
    if 'optarg' in request.args:
        optarg = int(request.args['optarg'])
    return url_for('getMyURL', reqid=reqid, optarg=optarg)    #generates dynamic URLs | check out argument pattern

@app.route('/books', methods=['GET'])
def api_all():
    return jsonify(books)

#optional args
@app.route('/books/book', methods=['GET'])
def api_id1():
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."
    
    results = []
    for book in books:
        if book['id'] == id:
            results.append(book)

    if(len(results)>0):        
        return jsonify(results)
    else:
        return "No Record Found"

#necessary args
@app.route('/books/book/<int:id>')
def api_id2(id):
    results = []
    for book in books:
        if book['id'] == id:
            results.append(book)

    if (len(results) > 0):
        return jsonify(results)
    else:
        return "No Record Found"

if __name__ == '__main__':
    app.run()

