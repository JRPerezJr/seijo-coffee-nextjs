// initialize unsplash
import { createApi } from 'unsplash-js';

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeShopPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 10,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async () => {
  const response = await fetch('http://localhost:3000/api/locations');

  const data = await response.json();

  const photos = await getListOfCoffeeShopPhotos();

  return data.map((shop, idx) => {
    return {
      ...shop,
      localImageUrl: photos[idx],
    };
  });
};
