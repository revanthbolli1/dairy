from flask import Flask, render_template, request, session, url_for, redirect, jsonify
from pymongo import MongoClient
import logging
import bcrypt
import webbrowser
import threading
import subprocess

# import webview
import os
from datetime import datetime


#MongoDB Connection
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['Dairy']
    customer_collection = db['Customers']
    owner_collection = db["owner_login"]
    entries_collection = db['Entries']
except Exception as e:
        logging.error("MongoDB Connection failed!")       


#Configuring Logs
logging.basicConfig(filename='app.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s',  filemode='w')


#FOR OPEN IN BROWSER
# def open_browser():
#     webbrowser.open('http://127.0.0.1:5000')


# START SERVER
# def run_flask():
#     app.run(debug=False)






#API ENDPOINTS
try:
    app = Flask(__name__, static_url_path='/static')
    app.secret_key = '19B91A0526'
    logging.info("Started Application")
    error = ""
    def authenticate_user(username, password):
        # Fetch the user document from the collection
        owner_document = owner_collection.find_one({'username': username})
        if owner_document:
            # Get the stored hashed password
            stored_hashed_password = owner_document['password']
            # Verify the provided password
            if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
                return True
        return False
    
    def find_missing_number(numbers):
        start = numbers[0]
        for i in range(1, len(numbers)):
            expected_number = start + i * 5
            if numbers[i] != expected_number:
                return expected_number
        return None

    def get_last_used_id():
        last_used = customer_collection.find_one(sort=[("customer_id", -1)])
        if last_used:
            return last_used['customer_id']
        return 1000

    def generate_unique_id():
        customer_ids = [doc["customer_id"] for doc in customer_collection.find({}, {"customer_id": 1, "_id": 0})]
        sorted_customer_ids = sorted(customer_ids)
        miss_num = find_missing_number(sorted_customer_ids)
        if miss_num is not None:
            new_id = miss_num
        else:
            last_id = get_last_used_id()
            new_id = last_id + 5
            new_id = new_id
        return new_id
        

    #ROUTES FOR INDEX PAGE
    @app.route('/')
    def index():
        session.pop("email",None)
        error = request.args.get("error","")
        return render_template('login.html', error=error)
    
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']
            if authenticate_user(username, password):
                session["email"] = username
                return redirect(url_for("home"))
            error = "Invalid Credentials"
        else:
            error = ""
        return redirect(url_for('index', error = error))

    

    #ROUTES FOR HOME PAGE
    @app.route("/home")
    def home():
        email = session.get('email')
        if email:
            message = request.args.get('message',"")
            return render_template('home.html', message=message)
        return redirect(url_for("index", error = "Please login first!"))





    #ROUTES FOR ADD CUSTOMER PAGE
    @app.route('/addcustomerpage')
    def addcustomerpage():
        success = request.args.get("success","")
        message = request.args.get("message","")
        email = session.get('email')
        if email:
            return render_template("addcustomer.html",success = success, message = message)
        return redirect(url_for("index", error = "Please login first!"))
    
    @app.route('/addcustomer', methods=['POST'])
    def addcustomer():
        email = session.get('email')
        if email:
            customer_name = request.form.get("customername")
            customer_phone = request.form.get("customerphone")
            customer_village = request.form.get("customervillage")
            customer_pic_file = request.files["customerprofilepic"]
            if customer_pic_file:
                customer_pic ="/static/images/"+ customer_pic_file.filename
            else:
                customer_pic = "/static/images/default-profile.png"
            
            customer_document = customer_collection.find_one({'customer_phone': customer_phone})
            if customer_document is None:
                customer_id = generate_unique_id()
                customer_document = {
                    "customer_id" : customer_id,
                    "customer_name" : customer_name,
                    "customer_phone": customer_phone,
                    "customer_village":customer_village,
                    "customer_pic":customer_pic,
                }
                customer_collection.insert_one(customer_document)
                message = "Customer Added Successfully"
                return redirect(url_for("addcustomerpage", success = message + " with ID : "+ str(customer_id)))
            message = "Customer Already Registered"
            return redirect(url_for("addcustomerpage", message = message + " with an ID : "+ str(customer_document["customer_id"])))
        
    @app.route("/addcustomerpage/back")
    def back():
        email = session.get('email')
        if email:
            return redirect(url_for("home"))





    #ROUTES FOR CUSTOMERS & ENTRIES PAGE
    @app.route("/customerspage")
    def customerspage():
        email = session.get('email')
        if email:
            customers = customer_collection.find().sort("customer_id",1)
            entries = entries_collection.find({})
            totalBusiness  = sum(doc.get("price", 0) for doc in entries)
            pendingBilldocs = entries_collection.find({"paid":False})
            total_unpaid_price = sum(doc["price"] for doc in pendingBilldocs)
            paidBilldocs = entries_collection.find({"paid":True})
            total_paid_price = sum(doc["price"] for doc in paidBilldocs)
            return render_template("customers.html",customers=customers, business = totalBusiness, pending = total_unpaid_price, paid = total_paid_price)
        return redirect(url_for("index", error = "Please login first!"))
    
    @app.route("/customerspage/back")
    def customerspageback():
        return redirect(url_for("back"))
    
    @app.route('/view_entry/<user_id>', methods=['GET'])
    def view_entry(user_id):
        entries = list(entries_collection.find({'customer_id': int(user_id)}))[::-1]
        pdocs = list(entries_collection.find({"customer_id":int(user_id), "paid":True}))
        updocs = list(entries_collection.find({"customer_id":int(user_id), "paid":False}))
        totalBusiness  = sum(doc.get("price", 0) for doc in entries)
        total_unpaid_price = sum(doc["price"] for doc in updocs)
        total_paid_price = sum(doc["price"] for doc in pdocs)

        for entry in entries:
            entry['_id'] = str(entry['_id'])
        return jsonify(entries,total_paid_price,total_unpaid_price,totalBusiness,user_id)
    


    #ROUTES FOR  DAILY ENTRY PAGE
    @app.route("/dailyentrypage")
    def dailyentrypage():
        message = request.args.get("message","")
        email = session.get('email')
        if email:
            customers = customer_collection.find().sort("customer_id",1)
            return render_template("dailyentry.html",customers=customers,message=message)
        return redirect(url_for("index", error = "Please login first!"))

    @app.route("/dailyentrypage/back")
    def dailyentrypageback():
        return redirect(url_for("back"))
    
    @app.route('/addentry',  methods=['GET', 'POST'])
    def addentry():
        message=""
        if request.method == "POST":
            customer_id = request.form["entry_id_hidden"]
            date = request.form["milkDate"]
            time = request.form["am_pm"]
            fat = request.form["fat"]
            snf = request.form["snf"]
            price = request.form["total"]
            quantity = request.form["quantity"]
            entry_document = {
                "customer_id": int(customer_id),
                "date":datetime.strptime(date, '%Y-%m-%d'),
                "time":time,
                "fat":float(fat),
                "snf":float(snf),
                "quantity":float(quantity),
                "price":float(price),
                "paid":False
            }
            customer_document = customer_collection.find_one({'customer_id': int(customer_id)})
            if customer_document:
                entries_collection.insert_one(entry_document)
                message="Entry added Successfully"
        return redirect(url_for("dailyentrypage",message = message))








    #ROUTES FOR CHANGE PASSWORD PAGE
    @app.route('/changepasswordpage')
    def changepasswordpage():
        error = request.args.get("error","")
        email = session.get('email')
        if email:
            return render_template("changepassword.html", error=error)
        return redirect(url_for("index", error = "Please login first!"))
    
    @app.route('/changepassword', methods=['GET', 'POST'])
    def changepassword():
        email = session.get('email')
        if email:
            if request.method == 'POST':
                old_password = request.form["oldpassword"]
                new_password = request.form["newpassword"]
                owner_document = owner_collection.find_one({'username': email})
                if owner_document:
                    db_password = owner_document['password']
                    if bcrypt.checkpw(old_password.encode('utf-8'), db_password):
                        message="Password changed successfully!"
                        new_hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
                        owner_collection.update_one({'_id': owner_document['_id']}, {'$set': {'password': new_hashed_password}})
                        return redirect(url_for("home",message=message))
            return redirect(url_for("changepasswordpage", error="Password was incorrect"))
        else:
            return redirect(url_for("index", error = "Please login first!"))
        
    @app.route("/changepasswordpage/back")
    def changepassword_back():
        return redirect(url_for("back"))
    

    
    #ROUTE FOR LOGOUT
    @app.route('/logout')
    def logout():
        session.pop("email",None)
        return redirect(url_for('index'))
    

    #ROUTE FOR HISTORY
    @app.route('/history')
    def history():
        email = session.get('email')
        entries=[]
        if email:
            entries= list(entries_collection.find().sort("_id",-1))
        return render_template("history.html",entries=entries)
    
    @app.route("/history/back")
    def history_back():
        return redirect(url_for("back"))
           
    

except Exception as e:
    logging.error("Application failed to start!")





if __name__ == '__main__':
    #FOR BROWSER
    # threading.Timer(1, open_browser).start()
    #FOR STANDALONE WINDOW OF PC
    # flask_thread = threading.Thread(target=run_flask)
    # flask_thread.start()
    # window = webview.create_window('MILKZONE', 'http://127.0.0.1:5000/', width=800, height=600, resizable=True)
    # webview.start()
    app.run(debug=True)






# Encrypting password
# import bcrypt
# from pymongo import MongoClient

# # Connect to MongoDB
# client = MongoClient('mongodb://localhost:27017/')
# db = client['Dairy']
# collection = db['owner_login']

# # Fetch the document you want to update
# document = collection.find_one({'name': 'Revanth'})

# if document:
#     # Get the user's password from the document
#     password = document['password']

#     # Hash the password using bcrypt
#     hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

#     # Update the document with the hashed password
#     collection.update_one({'_id': document['_id']}, {'$set': {'password': hashed_password}})

#     print("Password encrypted and updated successfully.")
# else:
#     print("User not found.")

# # Close the MongoDB connection
# client.close()





#Login Authentication 
# import bcrypt
# from pymongo import MongoClient

# # Connect to MongoDB
# client = MongoClient('mongodb://localhost:27017/')
# db = client['Dairy']
# collection = db['owner_login']

# def authenticate_user(username, password):
#     # Fetch the user document from the collection
#     user_document = collection.find_one({'name': username})

#     if user_document:
#         # Get the stored hashed password
#         stored_hashed_password = user_document['password']

#         # Verify the provided password
#         if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
#             return True
#     return False

# # Example usage
# name = 'Revanth'
# password = '3542'

# if authenticate_user(name, password):
#     print("Authentication successful.")
# else:
#     print("Authentication failed.")

# # Close the MongoDB connection
# client.close()





