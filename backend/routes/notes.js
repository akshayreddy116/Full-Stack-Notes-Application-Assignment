const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/auth");
const router = express.Router();

router.use(auth);
router.get("/", (req, res) => {
  db.all(
    "SELECT * FROM notes WHERE user_id=? ORDER BY updated_at DESC",
    [req.user.id],
    (err, rows) => {
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { title = "Untitled", content = "" } = req.body;

  db.run(
    "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
    [req.user.id, title, content],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

router.put("/:id", (req, res) => {
  const { title, content } = req.body;

  db.run(
    `UPDATE notes 
     SET title=?, content=?, updated_at=CURRENT_TIMESTAMP 
     WHERE id=?`,
    [title, content, req.params.id],
    () => {
      res.json({ message: "updated" });
    }
  );
});


router.delete("/:id", (req, res) => {
  db.run(
    "DELETE FROM notes WHERE id=?",
    [req.params.id],
    () => {
      res.json({ message: "deleted" });
    }
  );
});

module.exports = router;