from tkinter import *
from tkinter import messagebox

root = Tk()
root.title("GUI")
root.geometry("900x900")

photo = PhotoImage(file="codePy/test10img/sportgraylightshoes.png")
Label(root, image=photo, width=1000,
      height=1000, borderwidth=0).pack(padx=20, pady=15)

root.mainloop()