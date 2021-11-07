import nc from 'next-connect';

import db from '../../utils/db';
import data from '../../data/data';
import Location from '../../models/Location';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Location.deleteMany();
  await Location.insertMany(data.locations);
  db.disconnect();
  res.status(200).send({ message: 'seeded successfully' });
});

export default handler;
