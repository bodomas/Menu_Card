from pydantic import BaseModel
from typing import List, Optional
from .order_item import OrderItem

class Order(BaseModel):
    id: Optional[str] = None
    tableId: str
    items: List[OrderItem]
    total: float
    status: Optional[str] = "Placed"
    createdAt: Optional[int] = None
