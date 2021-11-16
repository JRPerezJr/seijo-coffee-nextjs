import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

const useFetchCoffeeShop = (id) => {
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  return {
    data,
    error,
  };
};

export default useFetchCoffeeShop;
