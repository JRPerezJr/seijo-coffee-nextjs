import { useEffect, useContext, useState } from 'react';

import useTrackLocation from '../hooks/use-track-location';
import Head from 'next/head';
import Image from 'next/image';

import { fetchCoffeeStores } from '../lib/coffee-stores';

import Banner from '../components/banner/banner';
import Card from '../components/card/card';

import styles from '../styles/Home.module.css';
import { StoreContext } from '../utils/Store';

// called on the server
export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const { dispatch, state } = useContext(StoreContext);

  const { nearbyCoffeeStores, latLong } = state;
  // const [nearbyCoffeeStores, setNearbyCoffeeStores] = useState('');
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { handleTrackLocation, isLocating, locationErrorMsg } =
    useTrackLocation();

  console.log({ latLong, locationErrorMsg });

  useEffect(async () => {
    if (latLong) {
      try {
        const fetchedCoffeeStores = await fetchCoffeeStores();
        console.log({ fetchedCoffeeStores });
        // setNearbyCoffeeStores(fetchCoffeeStores);
        dispatch({
          type: 'SET_COFFEE_STORES',
          payload: {
            nearbyCoffeeStores: fetchedCoffeeStores,
          },
        });
      } catch (error) {
        setCoffeeStoresError(error.message);
      }
    }
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    console.log('Btn Clicked');
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Seijo Coffee Connoisseur</title>
        <meta name="description" content="Discover coffee stores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          isLocating={isLocating}
          buttonText="View nearby stores"
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && (
          <p>Oops, something when wrong: {locationErrorMsg}</p>
        )}
        {coffeeStoresError && (
          <p>Oops, something when wrong: {coffeeStoresError}</p>
        )}

        <div className={styles.heroImage}>
          <Image src="/static/coffee.jpg" width={400} height={280} />
        </div>

        {nearbyCoffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Seijo stores</h2>
            <div className={styles.cardLayout}>
              {nearbyCoffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore._id}
                    className={styles.card}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.slug}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Seijo stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore._id}
                    className={styles.card}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.slug}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>Powered by Caffeine</footer>
    </div>
  );
}
