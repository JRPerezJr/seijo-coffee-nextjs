import { findRecordByFilter } from '../../lib/airtable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordByFilter(id);

      if (records.length !== 0) {
        res.status(200).json(records);
      } else {
        res.status(200).json({ message: `id could not be found ${id}` });
      }
    } else {
      res.status(400).json({ message: 'ID or name is missing.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', error });
  }
};

export default getCoffeeStoreById;
