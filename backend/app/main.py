from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers correctly
from app.routers.admin import router as admin_router
from app.routers.menu import router as menu_router

app = FastAPI(title="Restaurant QR API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "FastAPI + Firebase Running!"}

# Include routers
app.include_router(admin_router)
app.include_router(menu_router)
