import os
from firebase_admin import credentials, firestore, initialize_app

KEY_PATH = os.getenv("FIREBASE_KEY_PATH", "firebase-key.json")

cred = credentials.Certificate(KEY_PATH)
initialize_app(cred)
db = firestore.client()
