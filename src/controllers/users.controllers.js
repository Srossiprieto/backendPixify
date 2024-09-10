import { pool } from "../models/db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({
        message: "User not found",
      });
    res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password_hash } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, password_hash]
    );
    res.send({
      id: rows.insertId,
      username,
      email,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password_hash } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE users SET username = IFNULL(?, username), email = IFNULL(?, email), password_hash = IFNULL(?, password_hash) WHERE id = ?",
      [username, email, password_hash, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
