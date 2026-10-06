from tkinter import *
import tkinter as tk

root = Tk()
root.title("GUI")
root.geometry("1980x720")

photo = PhotoImage(file="codePy/test11menu/menu2/SS1.png")
Button(root, image=photo, width=300,
       height=300, borderwidth=0).pack(side=LEFT)

photo = PhotoImage(file="codePy/test11menu/menu2/SS2.png")
Button(root, image=photo, width=300,
       height=300, borderwidth=0).pack(side=RIGHT)


root.mainloop()