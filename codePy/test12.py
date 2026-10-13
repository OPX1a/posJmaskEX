from tkinter import *
from tkinter import messagebox

def sum():
    try:
        num1 = float(txt1Num1.get())
        num2 = float(txt2Num2.get())
        total1 = num1 + num2
        total2 = num1 - num2
        total3 = num1 * num2
        total4 = num1 / num2
        lblResult.config(text="Result: " + str(total1) + " (Sum), " + str(total2) + " (Difference), " + str(total3) + " (Product), " + str(total4) + " (Quotient)")
    except ValueError:
        messagebox.showerror(title="Input Error", message="Please enter valid numbers.")

root = Tk()
root.title("Sum Calculator")
root.geometry("500x300")
root.resizable(width=False, height=False)

lblNum1 = Label(root, text="number1:", font=("Times New Roman", 12))
lblNum1.grid(row=0, column=0, padx=10, pady=15)

txt1Num1 = Entry(root, font=("Times New Roman", 12),width=15)
txt1Num1.grid(row=0, column=1, padx=10, pady=15)

lblNum2 = Label(root, text="number2:", font=("Times New Roman", 12))
lblNum2.grid(row=1, column=0, padx=10, pady=15)

txt2Num2 = Entry(root, font=("Times New Roman", 12),width=15)
txt2Num2.grid(row=1, column=1, padx=10, pady=15)

btnSum = Button(root, text="Sum", font=("Times New Roman", 12), command=sum)
btnSum.grid(row=2, column=0, columnspan=2, pady=10)

lblResult = Label(root, text="Result: ", font=("Times New Roman", 12))
lblResult.grid(row=3, column=0, columnspan=2, pady=10)

root.mainloop()