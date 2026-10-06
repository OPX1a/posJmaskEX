from tkinter import *
root = Tk()
root.title("GUI Example")

def showMassage():
    Message = txt.get()
    #print(Message)
    Label(root, text=Message, fg="red", font=20, bg="yellow").pack()
    #label.config(text=Message)

txt = StringVar()
mytext = Entry(root, textvariable=txt).pack()

Button1 = Button(root, text="save", fg="white", bg="red",command=showMassage).pack()
#label=Label()
#label.pack()
root.geometry("500x500")
root.mainloop()