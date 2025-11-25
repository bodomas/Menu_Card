from app.services.firestore_service import FirestoreService

class MenuService:
    def __init__(self):
        self.db = FirestoreService()
        self.collection = "menu"

    def get_all(self):
        return self.db.list_collection(self.collection)

    def get(self, item_id):
        return self.db.get_doc(self.collection, item_id)

    def create(self, data):
        return self.db.create_doc(self.collection, data)

    def update(self, item_id, data):
        return self.db.update_doc(self.collection, item_id, data)

    def delete(self, item_id):
        return self.db.delete_doc(self.collection, item_id)
