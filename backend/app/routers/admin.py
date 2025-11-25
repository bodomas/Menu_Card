from fastapi import APIRouter, Form, HTTPException
from app.services.admin_service import AdminService

router = APIRouter(prefix="/api/admin", tags=["Admin"])
service = AdminService()

@router.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    user = service.login(username, password)
    if not user:
        raise HTTPException(401, "Invalid credentials")
    return user

@router.post("/create")
def create_admin(username: str = Form(...), password: str = Form(...)):
    service.create_admin(username, password)
    return {"status": "created", "username": username}
