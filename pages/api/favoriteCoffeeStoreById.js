import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from '../../lib/airtable';

const favoriteCoffeeStoreById = async (req, res) => {
  if (req.method === 'PUT') {
    const { id } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          const record = records[0];

          const calculateVoting = parseInt(record.ratingCount) + parseInt(1);

          // update a record
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                ratingCount: calculateVoting,
              },
            },
          ]);
          if (updateRecord) {
            const minifiedRecords = getMinifiedRecords(updateRecord);

            res.status(200).json(minifiedRecords);
          }
        } else {
          res
            .status(200)
            .json({ message: `Coffee store does not exist ${id}` });
        }
      } else {
        res.status(400).json({ message: 'ID or name is missing.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error updating coffee store rating', error });
    }
  }
};

export default favoriteCoffeeStoreById;
