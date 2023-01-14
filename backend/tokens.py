import random

def Generate_Token(googleid:str, cursor, expiration:int):
    token = random.randint(0,99999999)
    cursor.execute("SELECT Token FROM Token WHERE ID='{}'" .format(googleid))
    token_exist = cursor.fetchone()
    if(token_exist is None):
        cursor.execute("INSERT INTO Token(ID, Token, Expiration, UserID) VALUES(%s, %s, %s, %s)", (str(googleid), int(token), int(expiration), int(100),))
    else:
        cursor.execute("UPDATE Token SET Token = (%s) WHERE ID = (%s)", (int(token),str(googleid)))
    return {"token":token}

def Check_Token(googleid:str, token:int, cursor, conn):
    cursor.execute("SELECT Expiration FROM Token WHERE ID = (%s)", str(googleid))
    expire = cursor.fetchone()[0]
    epoch_time = int(time())
    if(epoch_time >= expire):
        cursor.execute("DELETE FROM Token WHERE ID = (%s)", str(googleid))
        conn.commit()
    cursor.execute("SELECT Token FROM Token WHERE ID = (%s)", str(googleid))
    token = cursor.fetchone()[0]
    if(token is None):
        return {"loggedin":False, "admin":False}
    elif(token == users_token):
        cursor.execute("SELECT isadmin FROM UserTable WHERE googleid = (%s)", str(googleid))
        admin = cursor.fetchone()[0]
        return {"loggedin":True, "admin":admin}
    else:
        return {"loggedin":False,"admin":False}
