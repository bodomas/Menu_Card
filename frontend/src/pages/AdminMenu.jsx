import React, { useEffect, useState } from "react";
import {
  db,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../firebase";
import "./Admin.css";

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Main",
    image: null,
  });

  // ----------------------------
  // LOAD MENU FROM FIRESTORE
  // ----------------------------
  async function loadMenu() {
    const snap = await getDocs(collection(db, "menu"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setItems(list);
  }

  useEffect(() => {
    loadMenu();
  }, []);

  // ----------------------------
  // IMAGE FILE HANDLER
  // ----------------------------
  function handleFile(e) {
    setForm({ ...form, image: e.target.files[0] });
  }

  // ----------------------------
  // ADD / UPDATE MENU ITEM
  // ----------------------------
  async function submit(e) {
    e.preventDefault();

    let imageUrl = editing?.imageUrl || null;

    // Upload image if selected
    if (form.image) {
      const imgRef = ref(storage, `menu/${Date.now()}-${form.image.name}`);
      await uploadBytes(imgRef, form.image);
      imageUrl = await getDownloadURL(imgRef);
    }

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      imageUrl,
    };

    if (editing) {
      await updateDoc(doc(db, "menu", editing.id), payload);
      setEditing(null);
    } else {
      await addDoc(collection(db, "menu"), payload);
    }

    setForm({
      name: "",
      description: "",
      price: "",
      category: "Main",
      image: null,
    });

    loadMenu();
  }

  // ----------------------------
  // EDIT MODE
  // ----------------------------
  function onEdit(item) {
    setEditing(item);
    setForm({ ...item, image: null });
  }

  // ----------------------------
  // DELETE MENU ITEM
  // ----------------------------
  async function onDelete(id) {
    if (!confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "menu", id));
    loadMenu();
  }

  return (
    <div className="admin-wrap">
      <h2 className="admin-title">Menu Management</h2>

      {/* Form */}
      <form className="admin-form" onSubmit={submit}>
        <input
          placeholder="Food Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Main</option>
          <option>Nasta</option>
          <option>Dessert</option>
          <option>Drink</option>
        </select>

        <textarea
          placeholder="Short Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        

        <button className="admin-btn">
          {editing ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* Items List */}
      <div className="admin-grid">
        {items.map((it) => (
          <div className="admin-item" key={it.id}>
           

            <h4>{it.name}</h4>
            <p className="small">{it.category}</p>
            <p className="price">₹{it.price}</p>

            <div className="edit-actions">
              <button className="edit-btn" onClick={() => onEdit(it)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(it.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
