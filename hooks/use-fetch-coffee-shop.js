import useSWR from 'swr';

const useFetchCoffeeShop = (id) => {
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`);

  return {
    data,
    error,
  };
};

export default useFetchCoffeeShop;
