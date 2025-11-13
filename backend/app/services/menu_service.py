from app.services.firestore_service import FirestoreService
from app.models.menu_item import MenuItem

COLLECTION = "menu"

class MenuService:
    def __init__(self):
        self.fs = FirestoreService()

    def get_all(self):
        return self.fs.list_collection(COLLECTION)

    def get(self, item_id):
        return self.fs.get_doc(COLLECTION, item_id)

    def create(self, item: MenuItem):
        data = item.dict(exclude={"id"})
        return self.fs.create_doc(COLLECTION, data)

    def update(self, item_id, item: MenuItem):
        updates = item.dict(exclude_unset=True, exclude={"id"})
        self.fs.update_doc(COLLECTION, item_id, updates)

    def delete(self, item_id):
        self.fs.delete_doc(COLLECTION, item_id)
