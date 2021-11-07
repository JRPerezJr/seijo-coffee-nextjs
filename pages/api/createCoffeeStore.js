import { getMinifiedRecords, table } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const {
      id,
      name,
      slug,
      localImageUrl,
      address,
      city,
      neighborhood,
      prefecture,
      postalCode,
      cc,
      rating,
      country,
    } = req.body;

    try {
      if (id) {
        // find a record
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);

          res.status(200).json(records);
        } else {
          // create a record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  slug,
                  localImageUrl,
                  address,
                  city,
                  neighborhood,
                  prefecture,
                  postalCode,
                  country,
                  cc,
                  rating,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);

            res.status(201).json(records);
          } else {
            res.status(400).json({ message: 'ID or name is missing.' });
          }
        }
      } else {
        res.status(400).json({ message: 'ID is missing.' });
      }
    } catch (error) {
      console.error('Error in creating or finding a store', error);
      res.status(500).json({
        message: 'Something went wrong! Error in creating or finding a store',
        error,
      });
    }
  }
};

export default createCoffeeStore;
