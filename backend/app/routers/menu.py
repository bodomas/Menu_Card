from fastapi import APIRouter, HTTPException
from app.services.menu_service import MenuService
from app.models.menu_item import MenuItem

router = APIRouter()
service = MenuService()

@router.get("/")
def get_all():
    return service.get_all()

@router.get("/{item_id}")
def get_item(item_id: str):
    item = service.get(item_id)
    if not item:
        raise HTTPException(404, "Item not found")
    return item

@router.post("/add")
def add_item(item: MenuItem):
    new_id = service.create(item)
    return {"id": new_id}

@router.put("/update/{item_id}")
def update_item(item_id: str, item: MenuItem):
    service.update(item_id, item)
    return {"status": "updated"}

@router.delete("/delete/{item_id}")
def delete_item(item_id: str):
    service.delete(item_id)
    return {"status": "deleted"}
