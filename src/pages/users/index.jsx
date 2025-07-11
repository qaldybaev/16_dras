import { useEffect, useMemo, useState } from "react";
import "./style.scss";

const UserPage = ({ setCount }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            firstName: "Ali",
            lastName: "Valiyev",
            email: "ali@mail.com",
            age: 21,
          },
          {
            id: 2,
            firstName: "Malika",
            lastName: "Saidova",
            email: "malika@mail.com",
            age: 25,
          },
          {
            id: 3,
            firstName: "Jasur",
            lastName: "Qo‘chqorov",
            email: "jasurq@mail.com",
            age: 28,
          },
          {
            id: 4,
            firstName: "Diyora",
            lastName: "Karimova",
            email: "diyora.karimova@gmail.com",
            age: 23,
          },
          {
            id: 5,
            firstName: "Shoxrux",
            lastName: "Toshpo‘latov",
            email: "shoxrux.tp@mail.com",
            age: 30,
          },
          {
            id: 6,
            firstName: "Nilufar",
            lastName: "Rasulova",
            email: "nilufar.rasulova@yahoo.com",
            age: 26,
          },
          {
            id: 7,
            firstName: "Murod",
            lastName: "Ismoilov",
            email: "murod.ism@gmail.com",
            age: 32,
          },
          {
            id: 8,
            firstName: "Ziyoda",
            lastName: "Nazarova",
            email: "ziyo_naz@mail.uz",
            age: 24,
          },
          {
            id: 9,
            firstName: "Bekzod",
            lastName: "Yo‘ldoshev",
            email: "bek.yoldoshev@mail.com",
            age: 27,
          },
          {
            id: 10,
            firstName: "Dilshod",
            lastName: "Abduqodirov",
            email: "dilshod_abq@mail.uz",
            age: 29,
          },
        ];
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setCount(users.length);
  }, [users]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (editId) {
      const updated = users.map((u) =>
        u.id === editId ? { ...u, ...form, age: parseInt(form.age) } : u
      );
      setUsers(updated);
      setEditId(null);
    } else {
      const newUser = {
        id: Date.now(),
        ...form,
        age: parseInt(form.age),
      };
      setUsers([...users, newUser]);
    }
    setForm({ firstName: "", lastName: "", email: "", age: "" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleEdit = (user) => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
    });
    setEditId(user.id);
  };

  const filteredUsers = useMemo(() => {
    let result = users.filter(
      (u) =>
        u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName?.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "firstName") {
      result.sort((a, b) =>
        sortOrder === "asc"
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName)
      );
    } else if (sortBy === "age") {
      result.sort((a, b) =>
        sortOrder === "asc" ? a.age - b.age : b.age - a.age
      );
    }

    return result;
  }, [users, search, sortBy, sortOrder]);

  return (
    <div className="continer">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="sortWrapper">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sorting</option>
          <option value="firstName">Name (A-Z)</option>
          <option value="age">Age</option>
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
        <h2>Add User</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>{editId ? "Edit" : "Add"}</button>
      </div>

      <h3>User List:</h3>
      <div className="box1">
        {filteredUsers.map((user) => (
          <div key={user.id} className="box">
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <button className="icon-btn" onClick={() => handleDelete(user.id)}>
              <i className="bx bx-trash"></i>
            </button>
            <button onClick={() => handleEdit(user)}>
              <i className="bx bx-edit-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
