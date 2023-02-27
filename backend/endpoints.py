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
import os
import psycopg2
import backend.tokens
from psycopg2.extensions import parse_dsn

temp = os.environ['DATABASE_URL']
db_environ = parse_dsn(temp)

def create_conn():
    conn = psycopg2.connect(
        database = db_environ["dbname"],
        host = db_environ["host"],
        user = db_environ["user"],
        password = db_environ["password"],
        port = db_environ["port"]
    )
    cursor = conn.cursor()
    return conn, cursor

@flask_app.route('/api')
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"

@flask_app.route('/users/<int:googleid>', methods = ['GET'])
@cross_origin()
def Get_User(googleid:int):
    conn, cursor = create_conn()
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["loggedin"] == False):#Check if user is logged in
        return admin
    cursor.execute("SELECT * FROM UserTable WHERE googleid= '{}'" .format(googleid),)
    UserRowTuple = cursor.fetchone()
    UserRowJson = json.dumps(UserRowTuple)
    conn.close()
    return UserRowJson

@flask_app.route('/users', methods = ['PUT'])
@cross_origin()
def Put_User():#googleid:int, firstname:str, lastname:str, isadmin:str, accountcreated:str, lastlogin:str):
    conn, cursor = create_conn()
    cursor.execute("SELECT MAX(id) FROM UserTable") #learned about serial after this implimentation
    max_id = cursor.fetchone()
    max_int = list(max_id)
    if len(max_int) == 0 or (len(max_int) == 1 and max_int[0] == None):
        max_int[0] = 0
        max_int = max_int[0]
    else:
        max_int = max_int[0]
    max_int += 1
    googleid = request.args.get("googleid")
    firstname = request.args.get("firstname")
    lastname = request.args.get("lastname")
    isadmin = False
    expiration = request.args.get("expiration")
    cursor.execute("SELECT googleid FROM UserTable WHERE googleid='{}'".format(googleid))
    user_exists = cursor.fetchone()
    if(user_exists is None):
        cursor.execute("SELECT NOW()")
        accountcreated = cursor.fetchone()[0]
        cursor.execute("SELECT NOW()")# There is definitely a better way to do this
        lastlogin = cursor.fetchone()[0]
        cursor.execute("INSERT INTO UserTable (id, googleid, firstname, lastname, isadmin, accountcreated, lastlogin) VALUES(%s, %s, %s, %s, %s, %s, %s)", (int(max_int), str(googleid), str(firstname), str(lastname), str(isadmin), str(accountcreated), str(lastlogin),))
        conn.commit()
        backend.tokens.Generate_Token(googleid, cursor, expiration)
        conn.commit()
#    cursor.close() currently closing here causes issues with continuous website use; need to impliment clean up seperately
#    conn.close()
    else:
        cursor.execute("SELECT NOW()")
        lastlogin = cursor.fetchone()[0]
        cursor.execute("UPDATE UserTable SET lastlogin = (%s) WHERE googleid = (%s)", (str(lastlogin), str(googleid)))
        backend.tokens.Generate_Token(googleid, cursor, expiration)
        conn.commit()
    cursor.execute("SELECT isadmin FROM UserTable WHERE googleid = '{}'".format(googleid))
    admin = cursor.fetchone()[0]
    cursor.execute("SELECT token FROM Token WHERE googleid = '{}'".format(googleid))
    token = cursor.fetchone()[0]
    conn.close()
    return {"loggedin":True, "isadmin":admin, "token":token}

@flask_app.route('/rsvp/<int:googleid>', methods = ['GET'])
@cross_origin()
def Get_RSVP(googleid:int):
    conn, cursor = create_conn()
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["loggedin"] == False):
        return {}
    cursor.execute("SELECT * FROM PersonalSelections WHERE UserID= '{}'" .format(googleid),)
    UserRowTuple = cursor.fetchone()
    UserRowJson = json.dumps(UserRowTuple)
    conn.close()
    return UserRowJson

@flask_app.route('/rsvp', methods = ['PUT'])
@cross_origin()
def Put_RSVP():
    conn, cursor = create_conn()
    cursor.execute("SELECT MAX(id) FROM PersonalSelections") #learned about serial after this implimentation
    max_id = cursor.fetchone()
    max_int = list(max_id)
    if len(max_int) == 0 or (len(max_int)==1 and max_int[0] == None):
        max_int[0] = 0
        max_int = max_int[0]
    else:
        max_int = max_int[0]
    max_int += 1
    rsvp = request.args.get("rsvp")
    MealSelect = request.args.get("mealselect")
    WeddingSong = request.args.get("weddingsong")
    googleid = request.args.get("googleid")
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["loggedin"] == False):
        return admin
    cursor.execute("SELECT id FROM PersonalSelections WHERE userid = '{}'" .format(googleid))
    exist = cursor.fetchone()
    if(exist is None):
        cursor.execute("INSERT INTO PersonalSelections (id, rsvp, mealselect, weddingsong, userid) VALUES(%s, %s, %s, %s, %s)", (int(max_int), str(rsvp), str(MealSelect), str(WeddingSong), str(googleid),))
    else:
        cursor.execute("UPDATE PersonalSelections SET rsvp = '{}', mealselect = '{}', weddingsong = '{}' WHERE userid = ('{}')".format(str(rsvp), str(MealSelect), str(WeddingSong), str(googleid)))
    conn.commit()
    conn.close()
    return {}

@flask_app.route('/statuses', methods = ['GET'])
@cross_origin()
def Get_Statuses():
    conn, cursor = create_conn()
    cursor.execute("SELECT * FROM Checklist")
    UserRowTuple = cursor.fetchall()
    UserRowJson = json.dumps(UserRowTuple)
    conn.close()
    return UserRowJson

@flask_app.route('/statuses', methods = ['PUT'])
@cross_origin()
def Put_Statuses():
    conn, cursor = create_conn()
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
    cursor.execute("SELECT todo FROM Checklist WHERE todo = '{}'" .format(todo))
    todo_exist = cursor.fetchone()
    if(todo_exist is None):
        cursor.execute("INSERT INTO Checklist (id, todo, isdone) VALUES(%s, %s, %s)", (int(max_int), str(todo), str(isdone)))
    else:
        cursor.execute("UPDATE Checklist SET isdone = (%s) WHERE todo = (%s)", (str(isdone), str(todo)))
    conn.commit()
    conn.close()
    return {"status":200}

@flask_app.route('/statuses', methods = ['DELETE'])
@cross_origin()
def Delete_Status():
    todo = request.args.get("todo")
    conn, cursor = create_conn()
    cursor.execute("DELETE FROM Checklist WHERE todo = '{}'".format(todo))
    conn.commit()
    conn.close()
    return {"status":200}

@flask_app.route('/token', methods = ['GET'])
@cross_origin()
def Get_Token():
    conn, cursor = create_conn()
    googleid = request.args.get("googleid")
    users_token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, users_token, cursor, conn)
    conn.close()
    return admin

@flask_app.route('/users')
@cross_origin()
def Get_Users():
    conn, cursor = create_conn()
    googleid = request.args.get("googleid")
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["admin"] == False):
        return admin
    cursor.execute("SELECT * FROM UserTable")
    UserRowTuple = cursor.fetchall()
    UserRowJson = json.dumps(UserRowTuple)
    conn.close()
    return UserRowJson

@flask_app.route('/rsvp')
@cross_origin()
def Get_RSVPs():
    conn, cursor = create_conn()
    googleid = request.args.get("googleid")
    token = request.args.get("token")
    admin = backend.tokens.Check_Token(googleid, token, cursor, conn)
    if(admin["admin"] == False):
        return admin
    cursor.execute("SELECT * FROM PersonalSelections")
    UserRowTuple = cursor.fetchall()
    UserRowJson = json.dumps(UserRowTuple)
    conn.close()
    return UserRowJson
