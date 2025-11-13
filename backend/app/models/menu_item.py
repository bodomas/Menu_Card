from pydantic import BaseModel
from typing import Optional

class MenuItem(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    price: float
    category: Optional[str] = "Main"
    imageUrl: Optional[str] = None
    available: bool = True
