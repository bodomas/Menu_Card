from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import menu, order, admin, payment

app = FastAPI(title="Restaurant QR API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(order.router, prefix="/api/order", tags=["Order"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(payment.router, prefix="/api/payment", tags=["Payment"])

@app.get("/")
def home():
    return {"status": "FastAPI + Firebase Running!"}
