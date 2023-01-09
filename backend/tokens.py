import random

def Generate_Token(googleid:str, cursor, expiration:int):
    token = random.randint(0,99999999)
    cursor.execute("INSERT INTO Token(ID, Token, Expiration, UserID) VALUES(%s, %s, %s, %s)", (str(googleid), int(token), int(expiration), int(100),))
    return cursor
