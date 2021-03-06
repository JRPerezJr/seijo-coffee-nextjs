import { useEffect, useState, useContext } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { fetchCoffeeStores } from '../../lib/coffee-stores';

import { StoreContext } from '../../contexts/coffee-stores/coffee-stores.context';
import { isEmpty } from '../../utils';

import styles from '../../styles/coffee-store.module.css';

import cls from 'classnames';
import useFetchCoffeeShop from '../../hooks/use-fetch-coffee-shop';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();

  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.slug === params.slug; //dynamic id
  });

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
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

export default function CoffeeStore(initialProps) {
  const router = useRouter();

  const slug = router.query.slug;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const {
        _id,
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
        ratingCount,
        rating,
      } = coffeeStore;

      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: `${_id}`,
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
          ratingCount,
          rating,
        }),
      });

      const dbCoffeeStore = await response.json();
    } catch (error) {
      console.error('Error creating coffee store', error);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return coffeeStore.slug === slug; //dynamic id
        });

        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      // SSG
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [slug, initialProps, initialProps.coffeeStore]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    address,
    city,
    country,
    prefecture,
    name,
    neighborhood,
    localImageUrl,
    rating,
  } = coffeeStore;

  const [ratingCount, setRatingCount] = useState(0);
  const [id, setId] = useState(0);

  // custom SWR hook
  const { data, error } = useFetchCoffeeShop(_id);

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0]);
      setRatingCount(data[0].ratingCount);
      setId(data[0].id);
    }
  }, [data]);

  const handleUpvoteButton = async () => {
    try {
      const response = await fetch('/api/favoriteCoffeeStoreById', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });

      const dbCoffeeStore = await response.json();

      if (dbCoffeeStore && dbCoffeeStore.length > 0) {
        let count = ratingCount + 1;
        setRatingCount(count);
      }
    } catch (error) {
      console.error('Error updating coffee store rating count', error);
    }
  };

  if (error) {
    return (
      <div>Something went wrong while retrieving the coffee store page</div>
    );
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name} | Seijo Coffee Connoisseur</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>??? Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={localImageUrl}
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
            <p className={styles.text}>
              {rating} out of {ratingCount} reviews
            </p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}
