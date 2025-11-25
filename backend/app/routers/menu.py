from fastapi import APIRouter, UploadFile, File, Form
from app.services.menu_service import MenuService
from app.config.firebase import db
from firebase_admin import storage
import uuid

router = APIRouter(prefix="/api/menu", tags=["Menu"])
service = MenuService()

@router.get("/")
def get_all():
    return service.get_all()

@router.post("/add")
async def add_item(
    name: str = Form(...),
    price: float = Form(...),
    category: str = Form(...),
    description: str = Form(""),
    image: UploadFile = File(None)
):
    image_url = None

    if image:
        bucket = storage.bucket()
        ext = image.filename.split(".")[-1]
        blob = bucket.blob(f"menu/{uuid.uuid4()}.{ext}")
        blob.upload_from_file(image.file, content_type=image.content_type)
        blob.make_public()
        image_url = blob.public_url

    data = {
        "name": name,
        "price": price,
        "category": category,
        "description": description,
        "imageUrl": image_url,
    }

    return {"id": service.create(data)}

@router.put("/update/{item_id}")
async def update_item(
    item_id: str,
    name: str = Form(...),
    price: float = Form(...),
    category: str = Form(...),
    description: str = Form(""),
    image: UploadFile = File(None)
):
    # get previous data
    old = service.get(item_id)

    image_url = old.get("imageUrl") if old else None

    if image:
        bucket = storage.bucket()
        ext = image.filename.split(".")[-1]
        blob = bucket.blob(f"menu/{uuid.uuid4()}.{ext}")
        blob.upload_from_file(image.file, content_type=image.content_type)
        blob.make_public()
        image_url = blob.public_url

    data = {
        "name": name,
        "price": price,
        "category": category,
        "description": description,
        "imageUrl": image_url,
    }

    service.update(item_id, data)
    return {"status": "updated"}

@router.delete("/delete/{item_id}")
def delete_item(item_id: str):
    service.delete(item_id)
    return {"status": "deleted"}
