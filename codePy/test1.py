from tkinter import *
from tkinter import Label

root = Tk()
root.title("My First GUI")
myLabel = Label(text = "Hello", fg="red", bg="yellow", font="blue").pack()
myLabel = Label(text = "Alan").pack()
myLabel = Label(text = "IT", font=40).pack()
root.geometry("300x200")

root.mainloop()