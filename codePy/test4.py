from tkinter import *

def on_button_click():
    Label.config(text="ຂໍຂອບໃຈທີ່ກົດປຸ່ມ!")

root = Tk()
root.title("GUI1")
myLabel = Label(root, text = "ສະບາຍດີ! ນີ້ແມ່ນ Label", font=("Phetsarath OT", 14)).pack(pady=20)
root.geometry("300x200")

button = Button(root, 
                text="ກົດບ່ອນນີ້", 
                width=10, 
                font=("Phetsarath OT", 12), 
                bg="#4CAF50", 
                fg="#F6F9F6",
                command=on_button_click)
button.pack(pady=10)

root.mainloop()