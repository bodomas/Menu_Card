from pydantic import BaseModel
from typing import Optional

class Admin(BaseModel):
    id: Optional[str] = None
    username: str
    password: str
    token: Optional[str] = None
