from fastapi import APIRouter, Body
from app.services.order_service import OrderService
from app.models.order import Order

router = APIRouter()
service = OrderService()

@router.post("/create")
def create_order(order: Order):
    return {"id": service.create(order)}

@router.get("/{order_id}")
def get_order(order_id):
    return service.get(order_id)

@router.put("/status/{order_id}")
def update_status(order_id, status: str = Body(...)):
    service.update_status(order_id, status)
    return {"status": "ok"}

@router.get("/table/{table_id}")
def get_by_table(table_id):
    return service.get_by_table(table_id)

@router.get("/all")
def get_all():
    return service.get_all()
