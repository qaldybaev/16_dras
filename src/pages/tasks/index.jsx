import { useEffect, useMemo, useState } from "react";

import "../users/style.scss";

const TasksPage = ({ setCount }) => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            title: "Uy ishi",
            desc: "React bo'limini yakunlash",
            time: "2025-07-10T18:00",
          },
          {
            id: 2,
            title: "Kitob o‘qish",
            desc: "Clean Code kitobining 3-bobini o‘qish",
            time: "2025-07-11T10:00",
          },
          {
            id: 3,
            title: "Sport bilan shug‘ullanish",
            desc: "30 daqiqa yugurish mashqi",
            time: "2025-07-11T07:30",
          },
          {
            id: 4,
            title: "Portfolio yangilash",
            desc: "Yangi loyihani portfolio saytga qo‘shish",
            time: "2025-07-12T13:00",
          },
          {
            id: 5,
            title: "Do‘stlar bilan uchrashuv",
            desc: "Kafe “Coffee Time”da soat 17:00 da",
            time: "2025-07-12T17:00",
          },
          {
            id: 6,
            title: "Backend darsini ko‘rish",
            desc: "Express.js routing darsini ko‘rib yozib olish",
            time: "2025-07-13T09:00",
          },
          {
            id: 7,
            title: "Ingliz tili mashqlari",
            desc: "20 ta yangi so‘z va 5 ta gap tuzish",
            time: "2025-07-13T20:00",
          },
          {
            id: 8,
            title: "Ota-onani ko‘rish",
            desc: "Ota-onani ziyorat qilish va sovg‘a olib borish",
            time: "2025-07-14T15:00",
          },
          {
            id: 9,
            title: "Loyihani test qilish",
            desc: "Frontend sahifalarni mobil versiyada test qilish",
            time: "2025-07-14T19:00",
          },
          {
            id: 10,
            title: "Reja tuzish",
            desc: "Kelgusi hafta uchun ish rejasi tuzish",
            time: "2025-07-15T08:30",
          },
        ];
  });

  const [form, setForm] = useState({
    title: "",
    desc: "",
    time: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => setCount(tasks.length), [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    const { title, desc, time } = form;
    if (!title || !desc || !time) return;

    const task = {
      id: editId || Date.now(),
      title,
      desc,
      time,
    };

    const updated = editId
      ? tasks.map((t) => (t.id === editId ? task : t))
      : [...tasks, task];

    setTasks(updated);
    setForm({ title: "", desc: "", time: "" });
    setEditId(null);
  };

  const handleDelete = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      desc: task.desc,
      time: task.time,
    });
    setEditId(task.id);
  };

  const filteredTasks = useMemo(() => {
    let result = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.time) - new Date(b.time)
        : new Date(b.time) - new Date(a.time);
    });

    return result;
  }, [tasks, search, sortOrder]);

  return (
    <div className="continer">
      <input
        type="text"
        placeholder="Search by title or description"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="sortWrapper">
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Time: {sortOrder === "asc" ? "↑ Earlier" : "↓ Later"}
          <i
            className={`bx ${
              sortOrder === "asc" ? "bx-sort-up" : "bx-sort-down"
            }`}
          ></i>
        </button>
      </div>

      <div className="formEl">
        <h2>{editId ? "Edit Task" : "Add Task"}</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
      </div>

      <h3>Task List:</h3>
      <div className="box1">
        {filteredTasks.map((task) => (
          <div key={task.id} className="box">
            <p>
              <b>Title:</b> {task.title}
            </p>
            <p>
              <b>Description:</b> {task.desc}
            </p>
            <p>
              <b>Time:</b> {task.time.replace("T", " ")}
            </p>
            <button onClick={() => handleDelete(task.id)}>
              {" "}
              <i className="bx bx-trash"></i>
            </button>
            <button onClick={() => handleEdit(task)}>
              <i className="bx bx-edit-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
