from tkinter import *
import tkinter as tk

root = Tk()
root.title("GUI")
root.geometry("1400x600")

photo1 = PhotoImage(file="codePy/test11menu/menu2/SS1.png")
Button(root, image=photo1, width=200, height=200, borderwidth=0).pack(side=LEFT, padx=10, pady=10)

photo2 = PhotoImage(file="codePy/test11menu/menu2/SS2.png")
Button(root, image=photo2, width=200, height=200, borderwidth=0).pack(side=LEFT, padx=10, pady=10)

photo3 = PhotoImage(file="codePy/test11menu/menu2/SS3.png")
Button(root, image=photo3, width=200, height=200, borderwidth=0).pack(side=LEFT, padx=10, pady=10)

photo4 = PhotoImage(file="codePy/test11menu/menu2/SS4.png")
Button(root, image=photo4, width=200, height=200, borderwidth=0).pack(side=LEFT, padx=10, pady=10)

photo5 = PhotoImage(file="codePy/test11menu/menu2/SS5.png")
Button(root, image=photo5, width=200, height=200, borderwidth=0).pack(side=LEFT, padx=10, pady=10)

photo6 = PhotoImage(file="codePy/test11menu/menu2/SS6.png")
Button(root, image=photo6, width=200, height=200, borderwidth=0).pack(side=LEFT, padx=10, pady=10)

root.mainloop()