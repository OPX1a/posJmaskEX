from tkinter import *

root = Tk()
root.title("GUI Example")
root.geometry("500x500")

def login():
    user = username_txt.get()
    pwd = password_txt.get()

    if user == "Alan" and pwd == "1234":
        result_label.config(text="ຖືກຕ້ອງ", fg="green")
    else:
        result_label.config(text="ບໍ່ຖືກຕ້ອງ", fg="red")

lbl_username = Label(root, text="Username")
lbl_username.pack()

username_txt = StringVar()
entry_username = Entry(root, textvariable=username_txt)
entry_username.pack()

lbl_password = Label(root, text="Password")
lbl_password.pack()

password_txt = StringVar()
entry_password = Entry(root, textvariable=password_txt, show="*")
entry_password.pack()

btn_login = Button(root, text="Login", fg="white", bg="red", command=login)
btn_login.pack(pady=10)

result_label = Label(root, text="", font=("Arial", 14))
result_label.pack(pady=10)

root.mainloop()