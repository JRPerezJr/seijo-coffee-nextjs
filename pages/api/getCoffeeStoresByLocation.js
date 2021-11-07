import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    // config latLong and limit
    // const { latLong, limit } = req.query; // only used with the Foursquare API

    const response = await fetchCoffeeStores();
    res.status(200).json(response);
  } catch (error) {
    console.error('There was an error', error.message);
    res.status(500).json({ message: 'Something went wrong!', error });
  }

  //  return
};

export default getCoffeeStoresByLocation;
