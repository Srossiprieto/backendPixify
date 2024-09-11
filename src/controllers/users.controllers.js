import User from '../models/users.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password_hash } = req.body;

    const user = new User({ username, email, password_hash });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user
    });
    console.log("User created successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un usuario existente
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.json({
      message: "User updated successfully",
      user
    });
    console.log("User updated successfully");
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Eliminar (desactivar) un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, { state: false }, { new: true });
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.json({
      message: "User deleted successfully",
      user
    });
    console.log("User deleted successfully");
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};