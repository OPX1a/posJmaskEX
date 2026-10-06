from tkinter import *

def open_gui2(message, text_color):
    root.withdraw()

    gui2 = Toplevel()
    gui2.title("GUI2")
    gui2.geometry("300x200")
    
    label2 = Label(gui2, text=message, font=("Phetsarath OT", 16), fg=text_color)
    label2.pack(pady=30)
    
    def back_to_gui1():
        gui2.destroy()  
        root.deiconify()
        
    button2 = Button(gui2, 
                     text="ຍ້ອນກັບ",
                     width=10, 
                     font=("Phetsarath OT", 12), 
                     bg="#4CAF50", 
                     fg="#F6F9F6",
                     command=back_to_gui1)
    button2.pack(side=BOTTOM, pady=20)
    
    gui2.protocol("WM_DELETE_WINDOW", back_to_gui1)

root = Tk()
root.title("GUI1")
root.geometry("300x200")

def login():
    user = username_txt.get()
    pwd = password_txt.get()

    username_txt.set("")
    password_txt.set("")

    if user == "Alan" and pwd == "1234":
        open_gui2("ຖືກຕ້ອງ", "green")
    else:
        open_gui2("ບໍ່ຖືກຕ້ອງ", "red")

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
btn_login.pack(pady=20)

root.mainloop()