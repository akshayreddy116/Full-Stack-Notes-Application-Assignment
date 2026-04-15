import { useEffect, useState, useRef } from "react";
import API from "../../api/client";
import useDebounce from "../../hooks/useDebounce";
import "./Editor.css";

export default function Editor({ note, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const latest = useRef({ title: "", content: "" });

  // ✅ load note ONLY when note id changes
  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");

      latest.current = {
        title: note.title || "",
        content: note.content || "",
      };
    }
  }, [note?.id]);

  // ✅ SAVE TO DB
  const saveToDB = async () => {
    if (!note) return;

    try {
      setSaving(true);

      await API.put(`/notes/${note.id}`, {
        title: latest.current.title,
        content: latest.current.content,
      });

    } finally {
      setSaving(false);
    }
  };

  const debouncedSave = useDebounce(saveToDB, 500);

  // 🔥 TITLE FIXED
  const handleTitle = (value) => {
    setTitle(value);

    latest.current.title = value;

    onUpdate({
      ...note,
      title: value,
      content: latest.current.content,
    });

    debouncedSave();
  };

  // 🔥 CONTENT
  const handleContent = (value) => {
    setContent(value);

    latest.current.content = value;

    onUpdate({
      ...note,
      title: latest.current.title,
      content: value,
    });

    debouncedSave();
  };

  if (!note) return <div>Select a note</div>;

  return (
    <div className="editor">

      <div className="editor-header">
        <input
          className="title-input"
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
          placeholder="Untitled"
        />
        
        <span>{saving ? "Saving..." : "Saved ✓"}</span>
      </div>

      <textarea
        className="content-input"
        value={content}
        onChange={(e) => handleContent(e.target.value)}
      />

    </div>
  );
}