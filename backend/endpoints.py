from flask import (
    Flask,
    render_template,
    send_from_directory,
    request,
    jsonify,
    json,
    make_response,
)
from flask_cors import cross_origin
from flask import Response
from . import flask_app
from time import time
import os
import psycopg2
import backend.tokens
from psycopg2.extensions import parse_dsn

temp = os.environ['DATABASE_URL']
db_environ = parse_dsn(temp)
conn = psycopg2.connect(
                        database = db_environ["dbname"],
                        host = db_environ["host"],
                        user = db_environ["user"],
                        password = db_environ["password"],
                        port = db_environ["port"]
)
cursor = conn.cursor()


@flask_app.route('/api')
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"

@flask_app.route('/users/<int:googleid>', methods = ['GET'])
@cross_origin()
def Get_User(googleid:int):
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["loggedin"] == False):#Check if user is logged in
        return admin
    cursor.execute("SELECT * FROM UserTable WHERE googleid= (%s)", ( str(googleid),))
    UserRowTuple = cursor.fetchone()
    UserRowJson = json.dumps(UserRowTuple)
    return UserRowJson

@flask_app.route('/users', methods = ['PUT'])
@cross_origin()
def Put_User():#googleid:int, firstname:str, lastname:str, isadmin:str, accountcreated:str, lastlogin:str):
    cursor.execute("SELECT MAX(id) FROM UserTable") #learned about serial after this implimentation
    max_id = cursor.fetchone()
    max_int = list(max_id)
    if len(max_int) == 0:
        max_int[0] = 0
        max_int = max_int[0]
    else:
        max_int = max_int[0]
    max_int += 1
    googleid = request.args.get("googleid")
    firstname = request.args.get("firstname")
    lastname = request.args.get("lastname")
    isadmin = request.args.get("isadmin")
    accountcreated = request.args.get("accountcreated")
    lastlogin = request.args.get("lastlogin")
    expiration = request.args.get("expiration")
    cursor.execute("SELECT googleid FROM UserTable WHERE googleid = (%s)", str(googleid))
    user_exists = cursor.fetchone()
    if(user_exists is None):
        cursor.execute("INSERT INTO UserTable (id, googleid, firstname, lastname, isadmin, accountcreated, lastlogin) VALUES(%s, %s, %s, %s, %s, %s, %s)", (int(max_int), str(googleid), str(firstname), str(lastname), str(isadmin), str(accountcreated), str(lastlogin),))
        conn.commit()
        backend.tokens.Generate_Token(googleid, cursor, expiration)
        conn.commit()
#    cursor.close() currently closing here causes issues with continuous website use; need to impliment clean up seperately
#    conn.close()
    else:
        cursor.execute("UPDATE UserTable SET isadmin = (%s), lastlogin = (%s) WHERE id = (%s)", (str(isadmin), str(lastlogin), str(googleid)))
        backend.tokens.Generate_Token(googleid, cursor, expiration)
        conn.commit()
    cursor.execute("SELECT isadmin FROM UserTable WHERE googleid = (%s)", str(googleid))
    admin = cursor.fetchone()[0]
    cursor.execute("SELECT token FROM Token WHERE id = (%s)", str(googleid))
    token = cursor.fetchone()[0]
    return {"loggedin":True, "isadmin":admin, "token":token}

@flask_app.route('/rsvp/<int:googleid>', methods = ['GET'])
@cross_origin()
def Get_RSVP(googleid:int):
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["loggedin"] == False):
        return admin
    cursor.execute("SELECT * FROM PersonalSelections WHERE UserID= (%s)", (str(googleid),))
    UserRowTuple = cursor.fetchone()
    UserRowJson = json.dumps(UserRowTuple)
    return UserRowJson

@flask_app.route('/rsvp', methods = ['PUT'])
@cross_origin()
def Put_RSVP():
    cursor.execute("SELECT MAX(id) FROM PersonalSelections") #learned about serial after this implimentation
    max_id = cursor.fetchone()
    max_int = list(max_id)
    if len(max_int) == 0:
        max_int[0] = 0
        max_int = max_int[0]
    else:
        max_int = max_int[0]
    max_int += 1
    RSVP = request.args.get("rsvp")
    MealSelect = request.args.get("mealselect")
    WeddingSong = request.args.get("weddingsong")
    googleid = request.args.get("googleid")
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["loggedin"] == False):
        return admin
    cursor.execute("SELECT id FROM UserTable WHERE userid = (%s)", str(googleid))
    exist = cursor.fetchone()
    if(exist is None):
        cursor.execute("INSERT INTO UserTable (id, rsvp, mealselect, weddingsong, userid) VALUES(%s, %s, %s, %s, %s)", (int(max_int), str(RSVP), str(MealSelect), str(WeddingSong), str(googleid),))
    else:
        cursor.execute("UPDATE UserTable SET (rsvp, mealselect, weddingsong) VALUES(%s, %s, %s) WHERE userid = (%s)", (str(RSVP), str(MealSelect), str(WeddingSong), str(googleid)))
    conn.commit()
    return {}

@flask_app.route('/statuses', methods = ['GET'])
@cross_origin()
def Get_Statuses():
    cursor.execute("SELECT * FROM Checklist")
    UserRowTuple = cursor.fetchall()
    UserRowJson = json.dumps(UserRowTuple)
    return UserRowJson

@flask_app.route('/statuses', methods = ['PUT'])
@cross_origin()
def Put_Statuses():
    todo = request.args.get("todo")
    isdone = request.args.get("isdone")
    googleid = request.args.get("googleid")
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["admin"] == False):
        return admin
    cursor.execute("SELECT MAX(id) FROM Checklist") #learned about serial after this implimentation
    max_id = cursor.fetchone()
    max_int = list(max_id)
    if len(max_int) == 0:
        max_int[0] = 0
        max_int = max_int[0]
    else:
        max_int = max_int[0]
    max_int += 1
    cursor.execute("SELECT todo FROM Checklist WHERE todo = (%s)", str(todo))
    todo_exist = cursor.fetchone()
    if(todo_exist is None):
        cursor.execute("INSERT INTO Checklist (id, todo, isdone) VALUES(%s, %s, %s)", (int(max_int), str(todo), str(isdone)))
    else:
        cursor.execute("UPDATE Checklist SET isdone = (%s) WHERE todo = (%s)", (str(isdone), str(todo)))
    conn.commit()
    return {"status":200}

@flask_app.route('/token', methods = ['GET'])
@cross_origin()
def Get_Token():
    googleid = request.args.get("googleid")
    users_token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    return admin

@flask_app.route('/users')
@cross_origin()
def Get_Users():
    googleid = request.args.get("googleid")
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["admin"] == False):
        return admin
    cursor.execute("SELECT * FROM UserTable")
    UserRowTuple = cursor.fetchall()
    UserRowJson = json.dumps(UserRowTuple)
    return UserRowJson

@flask_app.route('/rsvp')
@cross_origin()
def Get_RSVPs():
    googleid = request.args.get("googleid")
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["admin"] == False):
        return admin
    cursor.execute("SELECT * FROM PersonalSelections")
    UserRowTuple = cursor.fetchall()
    UserRowJson = json.dumps(UserRowTuple)
    return UserRowJson
