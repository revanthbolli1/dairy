from fastapi import FastAPI, Request, Form
from fastapi.params import Body
from fastapi.templating import Jinja2Templates
import uvicorn
from fastapi.staticfiles import StaticFiles


login_cred = {
    "user" : "revanth",
    "pwd" : "3542"
    }

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/")
async def home(request:Request):
    context = {"request":request}
    return templates.TemplateResponse("login.html",context)

@app.get("/changepassword")
async def change_pwd(request:Request):
    context = {"request":request}
    return templates.TemplateResponse("changepassword.html",context)

@app.get("/logout")
async def home(request:Request):
    context = {"request":request}
    return templates.TemplateResponse("login.html",context)

@app.get("/addcustomerpage")
async def home(request:Request):
    context = {"request":request}
    return templates.TemplateResponse("addcustomer.html",context)



@app.post("/login")
async def login_details( request:Request, username:str = Form(...),password : str = Form(...)):


    if(login_cred["user"] == username ):

        if(login_cred["pwd"] == password ):

            return templates.TemplateResponse("home.html",{"request":request})
    
        return templates.TemplateResponse("login.html", {"request": request, "error": "Password Incorrect"})
    
    return templates.TemplateResponse("login.html", {"request": request, "error": "Username Incorrect"})


@app.post("/changepwd")
def change_pass(request:Request,oldpassword:str = Form(...),newpassword:str = Form(...),repassword:str = Form(...)):
    
    if(login_cred["pwd"] == oldpassword):
        
        login_cred["pwd"] = newpassword
        return templates.TemplateResponse("changepassword.html",{"request" : request,"error" : "Login Successfull"})
    
    return templates.TemplateResponse("changepassword.html",{"request" : request,"error" : "Current password is worng"})


@app.post("/addcustomer")
def add_customer(request:Request,customername:str = Form(...),customerphone:str = Form(...),customervillage:str = Form(...)):
    
    id = 1000

    return templates.TemplateResponse("addcustomer.html",{"request" :request,"success" : f"Id of {customername} is {id}"})






