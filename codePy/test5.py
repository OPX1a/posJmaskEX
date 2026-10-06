from tkinter import *

root = Tk()
root.title("window 1")
root.geometry("300x200")

Label1 = Label(root,
               text="ສະບາຍດີ",
               font=("Phetsarath OT", 20))
Label1.pack(pady=40)

window = Toplevel(root)
window.title("window 2")
window.geometry("300x200")

Label2 = Label(window,
               text="ຂອບໃຈ",
               font=("Phetsarath OT", 20))
Label2.pack(pady=30)

root.mainloop()