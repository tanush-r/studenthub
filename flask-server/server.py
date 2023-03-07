from flask import Flask,jsonify,request, session, make_response, send_file
from flask_session import Session
import mysql.connector as mysql 
import time
import os

app = Flask(__name__)


# app.config["SESSION_COOKIE_SAMESITE"] = "None"
# app.config["SESSION_COOKIE_SECURE"] = True
# app.secret_key = 'your-secret-key'

mydb = mysql.connect(
  host="localhost",
  user="client",
  password="client",
  database = "studenthub"
)


@app.route("/teachers_list_api")
def teachers_list_api():
    classList = ["5A","5B","5C","5D"]
    ret_dict = {}
    for classSec in classList:
        mycursor = mydb.cursor()
        mycursor.execute("SELECT * FROM teachers WHERE CLASS = %s;",(classSec,))
        classSecTeachers = mycursor.fetchall()
        ret_dict[classSec[1]] = classSecTeachers
    return ret_dict

@app.route("/students_list_api")
def students_list_api():
    classList = ["5A","5B","5C","5D"]
    ret_dict = {}
    for classSec in classList:
        mycursor = mydb.cursor()
        mycursor.execute("SELECT * FROM students WHERE CLASS = %s;",(classSec,))
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
    session['email'] = email
    session['name'] = myresult[2]
    session['sem'] = myresult[5]
    session['logged'] = True
    session['type'] = "teacher"
    print(session['email'])
    return jsonify({"exists":"yes"}) 

@app.route("/sign_up_student", methods=["POST"])
def sign_up_student_api():
    content = request.json
    email = content['email']
    name = content['name']
    phone = str(content['phone'])
    password = content['password']
    classVal = content['class']
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO students(EMAIL,NAME,PHONE,PASSWORD,CLASS) VALUES (%s,%s,%s,%s,%s);",(email,name,phone,password,classVal))
    myresult = mycursor.fetchall()
    mydb.commit()
    return jsonify(myresult)

@app.route("/sign_in_student", methods=['POST'])
def sign_in_student():
    content = request.json
    email = content['email']
    password = content['password']
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM students WHERE EMAIL = %s AND PASSWORD = %s;",(email,password))
    myresult = mycursor.fetchone()
    print(myresult)
    if myresult == None:
        return jsonify({"exists":"no"})
    session['email'] = email
    session['name'] = myresult[2]
    session['sem'] = myresult[5]
    session['logged'] = True
    session['type'] = "student"
    print(session['email'])
    return jsonify({"exists":"yes"}) 

@app.route("/session_details_api", methods=['GET'])
def session_check_api():
    try:
        return jsonify({
            "logged": session["logged"],
            "type": session["type"],
            "details": {
                "email":  session["email"],
                "name": session["name"],
                "sem": session["sem"]
            }
    })
    except:
        return jsonify({
            "logged": False })

@app.route("/session_logout_api", methods=['GET'])
def session_logout_api():
    session["logged"] = False,
    session["email"] = None,
    session["type"] = None,
    session["name"] = None,
    session["sem"] = None
    return jsonify({"logged":session["logged"]}) 


@app.route("/create_post_api",methods=["POST"])
def create_post_api():
    content = request.json
    title = content['title']
    content_api = content['content']
    temail = session["email"]
    created_date = time.strftime('%Y-%m-%d %H:%M:%S')
    notes_pdf = "No"
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO posts(title, content, temail, created_date, notes_pdf) VALUES (%s,%s,%s,%s,%s);",(title, content_api, temail, created_date, notes_pdf))
    myresult = mycursor.fetchall()
    mydb.commit()
    mycursor.execute("SELECT pid from posts where title = %s and temail = %s",(title,temail))
    pid = mycursor.fetchone()[0]
    session["pid"] = pid
    print(pid)
    return jsonify({"success":True})

@app.route("/upload_pdf_api",methods=["POST","GET"])
def upload_pdf_api():
    file = request.files['file']
    if file.filename[-4:] != ".pdf":
        return(jsonify({"success":False}))
    pid = session["pid"]
    mycursor = mydb.cursor()
    mycursor.execute("UPDATE posts set notes_pdf='Yes' where pid = %s",(pid,))
    myresult = mycursor.fetchall()
    file.save(os.path.join(app.config['UPLOAD_FOLDER'],"Notes" + str(pid) + ".pdf"))
    session.pop("pid")
    return(jsonify({"success":True}))

@app.route("/show_posts_api",methods=["GET"])
def show_posts_api():
    mycursor = mydb.cursor()
    mycursor.execute("SELECT title,content,name,created_date,pid,notes_pdf FROM posts,teachers where posts.temail = teachers.email ORDER BY created_date DESC")
    posts = mycursor.fetchall()
    mydb.commit()
    if session["type"] != "student":
        return jsonify({
            "result":posts,
            "student":False
            })
    email = session["email"]
    mycursor = mydb.cursor()
    mycursor.execute("SELECT pid FROM saved_posts WHERE email = %s",(email,))
    myresult = [x[0] for x in mycursor.fetchall()]
    print(myresult)
    return jsonify({
            "result":posts,
            "student":True,
            "saved": myresult
            })

@app.route("/save_post_api",methods=["POST"])
def save_post_api():
    content = request.json
    print(content)
    pid = content["pid"]
    email = session["email"]
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO saved_posts VALUES (%s,%s)",(email,pid))
    myresult = mycursor.fetchall()
    mydb.commit()
    return myresult

@app.route("/show_saved_posts_api",methods=["GET"])
def show_saved_posts_api():
    email = session["email"]
    mycursor = mydb.cursor()
    mycursor.execute("SELECT title,content,name,created_date,posts.pid FROM posts,teachers,saved_posts where posts.temail = teachers.email and posts.pid = saved_posts.pid and saved_posts.email  = %s ORDER BY created_date DESC",(email,))
    myresult = mycursor.fetchall()
    print(myresult)
    return jsonify({"result":myresult})

@app.route("/get_pdf_notes/<key>",methods=["GET"])
def get_pdf_notes(key):
    # with open(os.path.join(app.config['UPLOAD_FOLDER'],"Notes" + str(32) + ".pdf"), "r") as file :
    #     response = make_response(file) 
    #     cd = f"attachment; filename=Notes"+str(32)+".pdf" 
    #     response.headers['Content-Disposition'] = cd 
    #     response.mimetype='application/pdf' 
    #     return response
    return send_file('./pdf_files/Notes'+str(key)+'.pdf')

if __name__ == "__main__":
    SECRET_KEY = "changeme"
    SESSION_TYPE = "filesystem"
    UPLOAD_FOLDER = "./pdf_files/"
    app.config.from_object(__name__)
    app.run(debug = True)
    