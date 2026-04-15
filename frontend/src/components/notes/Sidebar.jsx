import "./Sidebar.css";

export default function Sidebar({
  notes,
  setActive,
  active,
  createNote,
  deleteNote,
  setSearch,
  sidebarOpen = true,
  onToggleSidebar,
  onLogout,
}) {
  return (
    <div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        {sidebarOpen && <h2>Notes</h2>}
        {sidebarOpen && (
          <button className="add-btn" onClick={createNote}>
            + New
          </button>
        )}
      </div>

      {sidebarOpen && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search notes..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <div className="note-list">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${active === note.id ? "active" : ""}`}
            onClick={() => setActive(note.id)}
          >
            <div className="note-content">
              <div className="note-title">
                {note.title || "Untitled Note"}
              </div>
              <div className="note-desc">
                {note.content
                  ? note.content.substring(0, 50)
                  : "Empty note"}
              </div>
            </div>

            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          {sidebarOpen ? "Logout" : "⏻"}
        </button>
      </div>
    </div>
  );
}