import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { fetchCoffeeStores } from '../../lib/coffee-stores';

import styles from '../../styles/coffee-store.module.css';

import cls from 'classnames';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.slug === params.slug; //dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        slug: coffeeStore.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore({ coffeeStore }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const {
    address,
    city,
    country,
    prefecture,
    name,
    neighborhood,
    imgUrl,
    rating,
  } = coffeeStore;

  const handleUpvoteButton = () => console.log('Handled!');

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name} | Seijo Coffee Connoisseur</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={imgUrl}
            width={600}
            height={360}
            alt={name}
          />
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" />
            <p className={styles.text}>
              {neighborhood}, {city}, {prefecture}, {country}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" />
            <p className={styles.text}>{rating}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}
