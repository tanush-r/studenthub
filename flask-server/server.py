from flask import Flask,jsonify,request
import mysql.connector as mysql 

app = Flask(__name__)
mydb = mysql.connect(
  host="localhost",
  user="client",
  password="client",
  database = "studenthub"
)

@app.route("/teachers_list_api")
def members():
    classList = ["5A","5B","5C","5D"]
    ret_dict = {}
    for classSec in classList:
        mycursor = mydb.cursor()
        mycursor.execute("SELECT * FROM teachers WHERE CLASS = %s;",(classSec,))
        classSecTeachers = mycursor.fetchall()
        ret_dict[classSec[1]] = classSecTeachers
    return ret_dict

@app.route("/sign_up_teacher", methods =['POST'])
def sign_up_teacher():
    content = request.json
    email = content['email']
    name = content['name']
    phone = str(content['phone'])
    password = content['password']
    classVal = content['class']
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO teachers(EMAIL,NAME,PHONE,PASSWORD,CLASS) VALUES (%s,%s,%s,%s,%s);",(email,name,phone,password,classVal))
    myresult = mycursor.fetchall()
    mydb.commit()
    return jsonify(myresult)

@app.route("/sign_in_teacher", methods=['POST'])
def sign_in_teacher():
    content = request.json
    email = content['email']
    password = content['password']
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM teachers WHERE EMAIL = %s AND PASSWORD = %s;",(email,password))
    myresult = mycursor.fetchone()
    print(myresult)
    if myresult == None:
        return jsonify({"exists":"no"})
    return jsonify({"exists":"yes","details":myresult}) 

if __name__ == "__main__":
    app.run(debug = True)
    