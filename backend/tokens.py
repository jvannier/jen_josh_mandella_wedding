import random

def Generate_Token(googleid:str, cursor, expiration:int):
    token = random.randint(0,99999999)
    cursor.execute("INSERT INTO Token(ID, Token, Expiration, UserID) VALUES(%s, %s, %s, %s)", (str(googleid), int(token), int(expiration), int(100),))
    return cursor

def Check_Token(googleid:str, token:int, cursor, conn):
    cursor.execute("SELECT Expiration FROM Token WHERE ID = (%s)", str(googleid))
    expire = cursor.fetchone()
    epoch_time = int(time())
    if(epoch_time >= expire):
        cursor.execute("DELETE FROM Token WHERE ID = (%s)", str(googleid))
        conn.commit()
    cursor.execute("SELECT Token FROM Token WHERE ID = (%s)", str(googleid))
    token = cursor.fetchone()
    if(token == None):
        return {"loggedin":False, "admin":False}
    elif(token == users_token):
        cursor.execute("SELECT isadmin FROM UserTable WHERE googleid = (%s)", str(googleid))
        admin = cursor.fetchone()
        return {"loggedin":True, "admin":admin}
    else:
        return {"loggedin":False,"admin":False}
