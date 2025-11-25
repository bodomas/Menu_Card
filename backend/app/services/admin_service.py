from app.services.firestore_service import FirestoreService

class AdminService:
    def __init__(self):
        self.db = FirestoreService()
        self.collection = "admins"

    def login(self, username, password):
        user = self.db.get_doc(self.collection, username)
        if not user:
            return None

        if user.get("password") == password:
            return {"username": username, "login": True}

        return None

    def create_admin(self, username, password):
        data = {"username": username, "password": password}
        return self.db.create_doc(self.collection, data, doc_id=username)
