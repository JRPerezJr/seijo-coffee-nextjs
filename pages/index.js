import Head from 'next/head';
import Image from 'next/image';

// import coffeeStoreData from '../data/coffee-stores.json';

import Banner from '../components/banner/banner';
import Card from '../components/card/card';

import styles from '../styles/Home.module.css';

import { fetchCoffeeStores } from '../lib/coffee-stores';

// called on the server
export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      // coffeeStores: coffeeStoreData,
      // coffeeStores
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const handleOnBannerBtnClick = () => console.log('Btn Clicked');

  return (
    <div className={styles.container}>
      <Head>
        <title>Seijo Coffee Connoisseur</title>
        <meta name="description" content="Discover coffee stores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View nearby stores"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/coffee.jpg" width={400} height={280} />
        </div>

        {props.coffeeStores.length > 0 && (
          <>
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
          </>
        )}
      </main>

      <footer className={styles.footer}>Powered by Deez Nutz</footer>
    </div>
  );
}
