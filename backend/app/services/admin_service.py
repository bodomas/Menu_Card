import uuid
from passlib.hash import bcrypt
from app.services.firestore_service import FirestoreService
from app.models.admin import Admin

COLLECTION = "admin"

class AdminService:
    def __init__(self):
        self.fs = FirestoreService()

    def create(self, admin: Admin):
        data = {
            "username": admin.username,
            "passwordHash": bcrypt.hash(admin.password),
            "token": None
        }
        return self.fs.create_doc(COLLECTION, data)

    def login(self, admin: Admin):
        query = self.fs.db.collection(COLLECTION).where("username", "==", admin.username).stream()
        user = None
        for d in query:
            user = d
            break

        if not user:
            return None

        data = user.to_dict()
        if bcrypt.verify(admin.password, data.get("passwordHash")):
            token = str(uuid.uuid4())
            self.fs.update_doc(COLLECTION, user.id, {"token": token})
            return {"token": token, "username": data.get("username")}

        return None
