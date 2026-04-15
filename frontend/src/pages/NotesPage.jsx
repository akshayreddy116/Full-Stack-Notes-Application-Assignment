import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/client";
import Sidebar from "../components/notes/Sidebar";
import Editor from "../components/notes/Editor";
import Preview from "../components/notes/Preview";
import "../styles/notes.css";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data || []);
    if (res.data?.length) setActive(res.data[0].id);
  };

  const createNote = async () => {
    const res = await API.post("/notes", {
      title: "Untitled",
      content: "",
    });

    setNotes((prev) => [res.data, ...prev]);
    setActive(res.data.id);
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);

    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);

    if (updated.length) setActive(updated[0].id);
    else setActive(null);
  };


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateNoteLocal = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === updatedNote.id ? updatedNote : n
      )
    );
  };

  const activeNote = notes.find((n) => n.id === active);

  const filteredNotes = notes.filter((note) =>
    (note.title || "")
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar
        notes={filteredNotes}
        active={active}
        setActive={setActive}
        createNote={createNote}
        deleteNote={deleteNote}
        setSearch={setSearch}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
        onLogout={logout}
      />

      <div className="main-content" style={{ flex: 1, display: "flex" }}>
        <Editor note={activeNote} onUpdate={updateNoteLocal} />
        <Preview content={activeNote?.content || ""} />
      </div>
    </div>
  );
}