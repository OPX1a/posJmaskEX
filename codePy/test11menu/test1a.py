from tkinter import *
from PIL import Image, ImageTk
root = Tk()
root.title("tk")
root.geometry("850x400")
Label(root, text="1. Assignment", font=("Times New Roman", 14, "bold"), fg="red").pack(anchor=W, padx=20, pady=10)

img1 = Image.open("coffee.png").resize((90, 90))
photo1 = ImageTk.PhotoImage(img1)
Label(root, image=photo1, text="Coffee\n25,000 kip", compound=TOP, font=("Times New Roman", 11)).pack(side=LEFT, padx=15, pady=10)

img2 = Image.open("drink.png").resize((90, 90))
photo2 = ImageTk.PhotoImage(img2)
Label(root, image=photo2, text="Soft drink\n35,000 kip", compound=TOP, font=("Times New Roman", 11)).pack(side=LEFT, padx=15, pady=10)

img3 = Image.open("burger.png").resize((90, 90))
photo3 = ImageTk.PhotoImage(img3)
Label(root, image=photo3, text="Burger\n40,000 kip", compound=TOP, font=("Times New Roman", 11)).pack(side=LEFT, padx=15, pady=10)

img4 = Image.open("cupcake.png").resize((90, 90))
photo4 = ImageTk.PhotoImage(img4)
Label(root, image=photo4, text="Cupcake\n25,000 kip", compound=TOP, font=("Times New Roman", 11)).pack(side=LEFT, padx=15, pady=10)

img5 = Image.open("donut.png").resize((90, 90))
photo5 = ImageTk.PhotoImage(img5)
Label(root, image=photo5, text="Donut\n30,000 kip", compound=TOP, font=("Times New Roman", 11)).pack(side=LEFT, padx=15, pady=10)
root.mainloop()