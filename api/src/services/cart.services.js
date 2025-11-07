import { Cart, Routines } from "../models/index.js";
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Routines,
          as: "routine",
          attributes: ["nombre", "descripcion", "nivel", "img"],
        },
      ],
    });

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { routineId } = req.body;

    if (!routineId) {
      return res.status(400).json({ error: "routineId requerido" });
    }

    const item = await Cart.create({
      userId: req.user.id,
      routineId,
    });

    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.destroy({ where: { id, userId: req.user.id } });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.destroy({ where: { userId: req.user.id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
