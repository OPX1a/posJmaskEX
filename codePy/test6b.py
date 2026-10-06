from tkinter import *

def open_gui2():

    gui2 = Toplevel()
    gui2.title("GUI2")
    gui2.geometry("300x200")
    
    label2 = Label(gui2, text="ຂອບໃຈທີ່ກົດ", font=("Phetsarath OT", 14))
    label2.pack(pady=20)
    
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

label1 = Label(root, text="ສະບາຍດີ! ນີ້ແມ່ນ Label", font=("Phetsarath OT", 14))
label1.pack(pady=20)

button1 = Button(root, 
                 text="ກົດບ່ອນນີ້", 
                 width=10, 
                 font=("Phetsarath OT", 12), 
                 bg="#4CAF50", 
                 fg="#F6F9F6",
                 command=open_gui2)
button1.pack(side=BOTTOM, pady=20)

root.mainloop()