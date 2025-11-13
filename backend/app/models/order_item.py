from pydantic import BaseModel

class OrderItem(BaseModel):
    menuItemId: str
    name: str
    quantity: int
    price: float
