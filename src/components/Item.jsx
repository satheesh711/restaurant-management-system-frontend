import { useEffect, useState } from "react";
import {
    deleteItem,
    getItems,
    addItem,
    updateItem,
    getCategories,
    uploadImage,
} from "../services/itemService";
import Swal from "sweetalert2";
import ItemTable from "./ItemTable";

export const Item = () => {

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        imageUrl: "",
        imagefile: "",
        description: "",
        category: "",
    });
    const [showModal, setShowModal] = useState(false);

    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    // helpers for field validation
    const validateField = (name, value) => {
        switch (name) {
            case "name":
                if (!value.trim()) return "Name cannot be Empty";
                if (value.length < 3 || value.length > 50) return "Name must be between 3 and 50 length";
                if (!/^[a-zA-Z0-9\s\-.()]*$/.test(value)) return "Name only contains alphabets, numbers, -.()";
                return "";
            case "description":
                if (!value.trim()) return "Description cannot be Empty";
                if (value.length < 3 || value.length > 100) return "Description must be between 3 and 100 length";
                if (!/^[a-zA-Z0-9 :\-.'&/,?!+]*$/.test(value)) return "Description contains invalid characters";
                return "";
            case "price":
                if (value === "" || value === null || value === undefined) {
                    return "Price is required";
                }
                if (isNaN(value)) {
                    return "Price must be a number";
                }
                if (Number(value) <= 0) {
                    return "Price must be greater than 0";
                }
                return "";

            case "category":
                if (!value) return "Category is required";
                return "";
            default:
                return "";
        }
    };


    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (["name", "description", "price", "category"].includes(field)) {
                const errorMessage = validateField(field, formData[field]);
                if (errorMessage) newErrors[field] = errorMessage;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    useEffect(() => {
        getItems()
            .then((res) => {
                setItems(res);
                setFilteredItems(res);
            })
            .catch((err) => setError(err));

        getCategories()
            .then((res) => setCategories(res))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        let data = [...items];
        if (search.trim()) {
            data = data.filter(
                (item) =>
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.description.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (filterCategory !== "All") {
            data = data.filter((item) => item.category === filterCategory);
        }
        setFilteredItems(data);
        setCurrentPage(1);
    }, [search, filterCategory, items]);

    const successShow = (message) => {
        Swal.fire({
            position: "top",
            icon: "success",
            text: message,
            timer: 1800,
            showConfirmButton: false,
            toast: true,
        });
    };

    const errorShow = (message) => {
        Swal.fire({
            position: "top",
            icon: "error",
            text: message,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
        });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This item will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteItem(id);
                    successShow(res.message);
                    setItems((prev) => prev.filter((item) => item.id !== id));
                } catch (err) {
                    errorShow(err.response?.data?.message || "Delete failed");
                }
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            if (editingItem) {
                const res = await updateItem(editingItem.id, formData);
                successShow(res.message);
                setItems((prev) =>
                    prev.map((item) =>
                        item.id === editingItem.id ? { ...item, ...formData } : item
                    )
                );
            } else {
                const res = await addItem(formData);
                successShow(res.message);
                setItems((prev) => [...prev, res.data]);
            }
            closeModal();
        } catch (err) {
            console.log(err)
            errorShow(err.response?.data?.message || "Save failed");
        }
    };

    const openModal = (item = null) => {
        setEditingItem(item);
        setFormData(
            item || {
                name: "",
                price: "",
                imagefile: "",
                imageUrl: "",
                description: "",
                category: "",
            }
        );
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
    };

    if (error) return <p>Failed to load</p>;

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    placeholder="Search by name or description"
                    className="form-control w-25"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="form-select w-25"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button className="btn btn-primary" onClick={() => openModal()}>
                    ➕ Add Item
                </button>
            </div>

            <ItemTable
                data={filteredItems}
                columns={[
                    { key: "id", label: "ID" },
                    { key: "name", label: "Name" },
                    { key: "price", label: "Price" },
                    { key: "description", label: "Description" },
                    { key: "category", label: "Category" },
                    { key: "available", label: "Availability" },
                    { key: "status", label: "Status" },
                ]}
                onDelete={handleDelete}
                onEdit={openModal}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <form onSubmit={handleSubmit} className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingItem ? "Edit Item" : "Add Item"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className={`form-control mb-2 ${errors.name ? "is-invalid" : ""}`}
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^[a-zA-Z0-9\s\-.()]*$/.test(value)) {

                                            setFormData({ ...formData, name: value });
                                        }
                                        const errorMessage = validateField("name", value);
                                        setErrors((prev) => ({ ...prev, name: errorMessage }));
                                    }
                                    }
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                <input
                                    type="number"
                                    className={`form-control mb-2 ${errors.price ? "is-invalid" : ""}`}
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={(e) => {
                                        const value =e.target.value
                                        setFormData({ ...formData, price:  value})
                                        const errorMessage = validateField("price", value);
                                        setErrors((prev) => ({ ...prev, price: errorMessage }));
                                    }
                                    }
                                />
                                {errors.price && <div className="invalid-feedback">{errors.price}</div>}

                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="form-control mb-2"
                                    onChange={async (e) => {
                                        let newfile = "";
                                        if (e.target.files && e.target.files[0]) {
                                            newfile = e.target.files[0];
                                            setFormData({ ...formData, imagefile: newfile });
                                        }

                                        if (!newfile) {
                                            setFormData({ ...formData, imageUrl: "" });
                                        }
                                        else if (typeof newfile === "string") {
                                            setFormData({ ...formData, imageUrl: newfile });
                                        }
                                        else if (newfile instanceof File) {
                                            if (formData.imageUrl && formData.imageUrl.includes(newfile.name)) {
                                                console.log("Same image already uploaded, skipping...");
                                            } else {
                                                const imgUrl = await uploadImage(newfile);
                                                setFormData({ ...formData, imageUrl: imgUrl });
                                            }
                                        }

                                    }}
                                />

                                <textarea
                                    className={`form-control mb-2 ${errors.description ? "is-invalid" : ""}`}
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^[a-zA-Z0-9 :\-.'&/,?!+]*$/.test(value)) {
                                            setFormData({ ...formData, description: value });
                                        }

                                        const errorMessage = validateField("description", value);
                                        setErrors((prev) => ({ ...prev, description: errorMessage }));

                                    }
                                    }
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                <select
                                    className={`form-control mb-2 ${errors.category ? "is-invalid" : ""}`}
                                    value={formData.category}
                                    onChange={(e) =>{
                                         const value = e.target.value;
                                        setFormData({ ...formData, category: e.target.value })
                                        const errorMessage = validateField("category", value);
                                        setErrors((prev) => ({ ...prev, category: errorMessage }));
                                    }
                                    }
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-success">
                                    {editingItem ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
