import time
from app.services.firestore_service import FirestoreService
from app.models.order import Order

COLLECTION = "orders"

class OrderService:
    def __init__(self):
        self.fs = FirestoreService()

    def create(self, order: Order):
        order.createdAt = int(time.time() * 1000)
        data = order.dict(exclude={"id"})
        return self.fs.create_doc(COLLECTION, data)

    def get(self, order_id):
        return self.fs.get_doc(COLLECTION, order_id)

    def update_status(self, order_id, status):
        self.fs.update_doc(COLLECTION, order_id, {"status": status})

    def get_by_table(self, table_id):
        docs = (
            self.fs.db.collection(COLLECTION)
            .where("tableId", "==", table_id)
            .stream()
        )
        return [{**d.to_dict(), "id": d.id} for d in docs]

    def get_all(self):
        return self.fs.list_collection(COLLECTION)
