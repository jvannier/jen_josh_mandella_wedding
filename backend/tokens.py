import random
import psycopg2
from time import time


def Generate_Token(googleid:str, cursor, expiration:int):
    token = random.randint(0,99999999)
    cursor.execute("SELECT Token FROM Token WHERE googleid='{}'" .format(googleid))
    token_exist = cursor.fetchone()
    if(token_exist is None):
        cursor.execute("INSERT INTO Token(googleid, Token, Expiration) VALUES ('{}', '{}', '{}')" .format(googleid,token,expiration))
    else:
        cursor.execute("UPDATE Token SET Token = '{}' WHERE googleid = '{}'" .format(token, googleid))
    return {"token":token}

def Check_Token(googleid:str, token:int, cursor, conn):
    try:
        cursor.execute("SELECT Expiration FROM Token WHERE googleid = '{}'" .format(googleid))
        expire = cursor.fetchone()
        if (expire is None):
            return {"loggedin":False, "admin":False}
        epoch_time = int(time())
        if(epoch_time >= int(expire[0])):
            cursor.execute("DELETE FROM Token WHERE googleid = '{}'" .format(googleid))
            conn.commit()
        cursor.execute("SELECT Token FROM Token WHERE googleid = '{}'" .format(googleid))
        users_token = cursor.fetchone()
        if(users_token is None):
            return {"loggedin":False, "admin":False}
        elif(token == users_token[0]):
            cursor.execute("SELECT isadmin FROM UserTable WHERE googleid = '{}'" .format(googleid))
            admin = cursor.fetchone()
            if(admin is None):
                admin = False
            else:
                admin = admin[0]
            return {"loggedin":True, "admin":admin}
        else:
            return {"loggedin":False,"admin":False}
    except psycopg2.ProgrammingError: #retry. Weird psycopg2.ProgrammingError: no results to fetch" bug in psycopg2
        return Check_Token(googleid, token, cursor, conn)
