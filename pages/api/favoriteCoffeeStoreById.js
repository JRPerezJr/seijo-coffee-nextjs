const favoriteCoffeeStoreById = async (req, res) => {
  if (req.method === 'PUT') {
    const { id } = req.body;

    res.json({ id });
  }
};

export default favoriteCoffeeStoreById;
