import { useEffect, useMemo, useState } from "react";
import "../users/style.scss"
const ProductPage = ({ setCount }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            id: 1,
            title: "Olma",
            price: 10000,
            category: "Mevalar",
            desc: "Farg'ona bog'laridan terilgan shirali va vitaminlarga boy qizil olma.",
          },
          {
            id: 2,
            title: "Banan",
            price: 15000,
            category: "Mevalar",
            desc: "Ekvadordan import qilingan yumshoq, tabiiy shirin bananlar.",
          },
          {
            id: 3,
            title: "Sut",
            price: 8000,
            category: "Sut mahsulotlari",
            desc: "Yangi sog‘ilgan sigir suti – 100% tabiiy va konservantsiz.",
          },
          {
            id: 4,
            title: "Coca-Cola",
            price: 12000,
            category: "Ichimliklar",
            desc: "Muzdek, gazlangan va tetiklashtiruvchi klassik Coca-Cola.",
          },
          {
            id: 5,
            title: "Piyoz",
            price: 4000,
            category: "Sabzavotlar",
            desc: "O‘zbekistonda yetishtirilgan, ovqatlarga mazali ta’m beruvchi piyoz.",
          },
          {
            id: 6,
            title: "Pomidor",
            price: 9000,
            category: "Sabzavotlar",
            desc: "Quyoshda pishgan, salat va taomlar uchun ideal suvli pomidor.",
          },
          {
            id: 7,
            title: "Tuxum",
            price: 1500,
            category: "Sut mahsulotlari",
            desc: "Mahalliy fermer xo‘jaligidan olinadigan toza tovuq tuxumlari.",
          },
          {
            id: 8,
            title: "Sharbat",
            price: 10000,
            category: "Ichimliklar",
            desc: "Tabiiy mevalardan tayyorlangan, shakar qo‘shilmagan sog‘lom sharbat.",
          },
          {
            id: 9,
            title: "Qovun",
            price: 20000,
            category: "Mevalar",
            desc: "Yozgi issiqda sovituvchi, shirin va hidi yoqimli navli qovun.",
          },
          {
            id: 10,
            title: "Kartoshka",
            price: 5000,
            category: "Sabzavotlar",
            desc: "Qaynatish, qovurish yoki pishirish uchun ideal yangi kartoshka.",
          },
        ];
  });

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    desc: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => setCount(products.length), [products]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    const { title, price, category, desc } = form;
    if (!title || !price || !category || !desc) return;

    const product = {
      id: editId || Date.now(),
      title,
      price: +price,
      category,
      desc,
    };

    const updated = editId
      ? products.map((p) => (p.id === editId ? product : p))
      : [...products, product];

    setProducts(updated);
    setForm({ title: "", price: "", category: "", desc: "" });
    setEditId(null);
  };

  const handleDelete = (id) => setProducts(products.filter((p) => p.id !== id));

  const handleEdit = (p) => {
    setForm({
      title: p.title,
      price: p.price,
      category: p.category,
      desc: p.desc,
    });
    setEditId(p.id);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.desc?.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "price") {
      result.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    return result;
  }, [products, search, sortBy, sortOrder]);

  return (
    <div className="continer">
      <input
        type="text"
        placeholder="Search by"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="sortWrapper">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sorting</option>
          <option value="price">Price</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <i
            className={`bx ${
              sortOrder === "asc" ? "bx-sort-up" : "bx-sort-down"
            }`}
          ></i>
        </button>
      </div>
      <div className="formEl">
        <h2>{editId ? "Edit Product" : "Add Product"}</h2>

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Kategoriya tanlang</option>
          <option value="Mevalar">Mevalar</option>
          <option value="Ichimliklar">Ichimliklar</option>
          <option value="Sabzavotlar">Sabzavotlar</option>
          <option value="Sut mahsulotlari">Sut mahsulotlari</option>
        </select>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
      </div>

      <h3>Product List:</h3>
      <div className="box1">
        {filteredProducts.map((p) => (
          <div key={p.id} className="box">
            <p>
              <b>Category:</b> {p.category}
            </p>
            <p>
              <b>Title:</b> {p.title}
            </p>
            <p>
              <b>Price:</b> {p.price} UZS
            </p>

            <p>
              <b>Description:</b> {p.desc}
            </p>
            <button onClick={() => handleDelete(p.id)}>
              {" "}
              <i className="bx bx-trash"></i>
            </button>
            <button onClick={() => handleEdit(p)}>
              <i className="bx bx-edit-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
