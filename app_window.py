# import tkinter as tk
# import webview

# # def open_flask_app():
#     # webview.create_window('Milkzone', 'http://127.0.0.1:5000/', width=800, height=600, resizable=True)
#     # webview.start()

# # root = tk.Tk()
# webview.create_window('Milkzone', 'http://127.0.0.1:5000/', width=800, height=600, resizable=True)
# webview.start()
# # root.title("Flask App Window")
# # start_button = tk.Button(root, text="Start Flask App", command=open_flask_app)
# # start_button.pack(pady=20)
# # root.mainloop()


from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client['Dairy']
collection = db['Entries']

# Insert a document with a proper ISODate
current_date = datetime.utcnow()
document = {
    "name": "John Doe",
    "date": current_date
}
collection.insert_one(document)

# Query documents with a date greater than a specific date
query_date = datetime(year=2024, month=1, day=1)
result = collection.find({"date": {"$gt": query_date}})

for doc in result:
    print(doc)
