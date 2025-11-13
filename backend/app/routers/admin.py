from fastapi import APIRouter, HTTPException
from app.services.admin_service import AdminService
from app.models.admin import Admin

router = APIRouter()
service = AdminService()

@router.post("/create")
def create_admin(admin: Admin):
    return {"id": service.create(admin)}

@router.post("/login")
def login(admin: Admin):
    result = service.login(admin)
    if not result:
        raise HTTPException(401, "Invalid username or password")
    return result
