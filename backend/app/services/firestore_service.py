from app.config.firebase import db

class FirestoreService:
    def list_collection(self, collection):
        docs = db.collection(collection).stream()
        return [{**d.to_dict(), "id": d.id} for d in docs]

    def get_doc(self, collection, doc_id):
        doc = db.collection(collection).document(doc_id).get()
        if not doc.exists:
            return None
        return {**doc.to_dict(), "id": doc.id}

    def create_doc(self, collection, data, doc_id=None):
        if doc_id:
            ref = db.collection(collection).document(doc_id)
            ref.set(data)
            return doc_id
        ref = db.collection(collection).document()
        ref.set(data)
        return ref.id

    def update_doc(self, collection, doc_id, updates):
        db.collection(collection).document(doc_id).update(updates)

    def delete_doc(self, collection, doc_id):
        db.collection(collection).document(doc_id).delete()
