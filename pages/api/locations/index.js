import nc from 'next-connect';
import db from '../../../utils/db';
import Location from '../../../models/Location';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const locations = await Location.find({});
  db.disconnect();
  res.status(200).send(locations);
});

export default handler;
