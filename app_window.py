import tkinter as tk
import webview

# def open_flask_app():
    # webview.create_window('Milkzone', 'http://127.0.0.1:5000/', width=800, height=600, resizable=True)
    # webview.start()

# root = tk.Tk()
webview.create_window('Milkzone', 'http://127.0.0.1:5000/', width=800, height=600, resizable=True)
webview.start()
# root.title("Flask App Window")
# start_button = tk.Button(root, text="Start Flask App", command=open_flask_app)
# start_button.pack(pady=20)
# root.mainloop()
