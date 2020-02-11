from flask import Flask
from flask import request,jsonify,make_response
from flask_cors import CORS
from flask_mysqldb import MySQL
import hashlib
import os
import json
import jwt
import math

app = Flask(__name__,static_url_path = '/static')
CORS(app)

app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "Meena@sql@123"
app.config["MYSQL_DB"] = "manage_quora"
app.config["MYSQL_CURSOR"] = "DictCursor"
mysql = MySQL(app)

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

def generate_salt():
    salt = os.urandom(16)
    return salt.hex()

# register user
@app.route('/register' ,methods = ['POST'])
def register():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]
    salt = generate_salt()
    password_hash = md5_hash(password+salt)
    cursor = mysql.connection.cursor()
    cursor.execute(
        """insert into users(name,email,salt,password_hash)
        values(%s,%s,%s,%s)""",(name,email,salt,password_hash)
    )
    mysql.connection.commit()
    cursor.close()
    return {"message":"Success"}

# login user
@app.route('/login',methods = ['POST'])
def loginUser():
    flag = False
    email = request.json["email"]
    password = request.json["password"]
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from users where email = (%s)""",[email])
    result = cursor.fetchall()    
    # print(result)
    items = []
    for item in result:
        items.append(item)
    cursor.close()
    for i in range(len(items)):
        # print(items)
        encoded_jwt=jwt.encode(
            {"id":items[i][0], "name": items[i][1]},'secretkey',algorithm='HS256').decode("utf-8")
            # print(encoded_jwt)
        return json.dumps(encoded_jwt)
        # for item in result:
        # if str(email)==str(item["email"]) and str(item["pasword_hash"])==str(md5_hash(password+item["salt"])):
        #     flag = True
        # encoded_jwt = jwt.encode({"user":item["id"],"name":item["name"]},'secretkey' algoritms = 'HS256').decode('utf-8')
        # if flag == True:
        #     return json.dumps(str(encoded_jwt))
        # else:
        #     return json.dumps("Wrong password")

# get-token-user
@app.route('/get-token-user')
def getTokenUser():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(" ")[1]
    decode_token = jwt.decode(token_encoded,'secretkey',algorithms = ['HS256'])
    return json.dumps(decode_token)

# edit profile of user
@app.route('/edit-profile',methods = ['POST'])
def editProfile():
    user_id = request.headers.get("user_id")
    print(user_id)
    if request.method == 'POST':
        f = request.files['profile_image']
        location = "static/img" + f.filename
        f.save(location)
    cursor = mysql.connection.cursor()
    cursor.execute(
        """update users set profile_image = (%s) where id = (%s)""",[location,user_id]
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps(location)

# category-add
@app.route('/category-add',methods = ['POST'])
def categoryAdd():
    category_name = request.json["category_name"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ INSERT INTO categories(category_name) values(%s)""",[category_name]
    )
    mysql.connection.commit()
    cursor.close()
    return {"message":"Added"}

# question add by json
@app.route('/question-add',methods = ['POST'])
def questionAdd():
    question = request.json["question"]
    user_id  = request.json["user_id"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ INSERT INTO questions(question,user_id) values(%s,%s)""",
        [question,user_id]
    )
    mysql.connection.commit()
    cursor.close()
    return {"message":"Added"}

# users
@app.route('/user-details')
def userDetails():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(" ")[1]
    decode_token = jwt.decode(token_encoded,'secretkey',algorithms = ['HS256'])
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ select *  from users where id = (%s)""",[decode_token["id"]]
    )
    result = cursor.fetchall()
    cursor.close()
    items = []
    for item in result:
        items.append(item)
    return json.dumps(items)

# all users
@app.route('/all-users')
def allUsers():
    # auth_header = request.headers.get('Authorization')
    # token_encoded = auth_header.split(" ")[1]
    # decode_token = jwt.decode(token_encoded,'secretkey',algorithms = ['HS256'])
    user_id = request.headers.get("user_id")
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ select * from users where id != (%s)""",(user_id)
    )
    result = cursor.fetchall()
    cursor.close()
    items = []
    for item in result:
        items.append(item)
    return json.dumps(items)
# send connection
@app.route('/send-connection',methods = ['POST'])
def sendConnection():
    sender_user_id = request.json["sender_user_id"]
    receiver_user_id = request.json["receiver_user_id"]
    connection = True
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ insert into connection(sender_user_id,receiver_user_id) values(%s,%s)""",
        [sender_user_id,receiver_user_id]
    )
    cursor.connection.commit()
    cursor.close()
    return json.dumps(connection)
# check follower
@app.route('/check-follower')
def checkFollower():
    sender_user_id = request.headers.get("sender_user_id")
    receiver_user_id = request.headers.get("receiver_user_id")
    # check = True
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ select * from connection where sender_user_id = (%s) and receiver_user_id = (%s)""",
        [sender_user_id,receiver_user_id]
    )
    result = cursor.fetchall()
    cursor.close()
    return json.dumps(result)

@app.route('/add-answer',methods = ['POST'])
def addAnswer():
    answer = request.json["answer"]
    question_id  = request.json["question_id"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ INSERT INTO answers(answer,question_id) values(%s,%s)""",
        [answer,question_id]
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Answer Added")

# pagination
@app.route('/all-questions-answers',methods = ['GET'])
def showQuestionsAnswers():
    page = request.args.get("page" ,default = 1,type = int)
    return paginationHome(page)

# all questions
# @app.route('/all-questions-answers')
def paginationHome(page):
    rows = int(request.headers.get("rows"))
    offset = (page-1)*rows
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ select * from answers left join questions on 
        answers.question_id = questions.question_id limit %s offset %s""",(rows,offset)
    )
    result = cursor.fetchall()
    cursor.execute(
        """ select * from answers"""
    )
    result1 = cursor.fetchall()
    cursor.close()
    total_pages = math.ceil(len(result1)/rows)
    total_results = len(result1)
    return{
        "total_pages":total_pages,
        "total_results":total_results,
        "page":page,
        "data":result,
        "per_page":rows
    }
   
# add answer
@app.route('/answer-add',methods = ['POST'])
def answerAdd():
    question = request.headers.get("question")
    user_id  = request.headers.get("user_id")
    category_id = request.headers.get("category_id")
    f = request.files["question_image"]
    location = "static/img" + f.filename
    f.save(location) 
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ INSERT INTO questions(question,user_id,category_id,question_image) values(%s,%s,%s,%s)""",
        [question,user_id,category_id,location]
    )
    mysql.connection.commit()
    cursor.close()
    return {"message":"Added"}

# get connection details of user
@app.route('/get-connection-details',methods = ['GET'])
def getConnectionDetails():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(" ")[1]
    decode_token = jwt.decode(token_encoded,'secretkey',algorithms = ['HS256'])
    # user_id = request.headers.get("user_id")
    print(data["id"])
    cursor = mysql.connection.cursor()
    cursor.execute(
         """select name,receiver_user_id from users left join 
         connection on users.id = connection.receiver_user_id where users.id != (%s)""",[data["id"]]
    )
    result = cursor.fetchall()
    cursor.close()
    return json.dumps(result)

# cancel connection of follow user
@app.route('/cancel-connection',methods = ['POST'])
def cancelConnection():
    connection_id = int(request.json["connection_id"])
    sender_user_id = int(request.json["sender_user_id"])
    cursor = mysql.connection.cursor()
    cursor.execute(
         """ DELETE from connection where connection_id = (%s) and sender_user_id = (%s)""",[connection_id,sender_user_id]
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Canceled")

# search user
@app.route('/search-user',methods = ['POST'])
def searchUser():
    name = request.json["name"]
    cursor = mysql.connection.cursor()
    string = f"%{name}%"
    cursor.execute(
        """ select * from users where name like (%s) """,[string]
    )
    result = cursor.fetchall()
    cursor.close()
    return json.dumps(result)

# search questions
@app.route('/search-question',methods = ['POST'])
def searchQuestion():
    question = request.json["question"]
    cursor = mysql.connection.cursor()
    string = f"%{question}%"
    cursor.execute(
        """select question,answer from questions join answers 
        on questions.question_id = answers.question_id where question like (%s) """,[string]
    )
    result = cursor.fetchall()
    cursor.close()
    return json.dumps(result)


# get catgeory for frontend:
@app.route('/get-category')
def getCategory():
    category_id = request.json["category_id"]
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from categories where category_id =(%s)""")
    result = cursor.fetchall()
    cursor.close()
    items = []
    for item in result:
        items.append(item)
    return json.dumps(items)

if __name__== "main":
    app.run(debug=True)

