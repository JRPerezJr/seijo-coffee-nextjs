import { useState, useContext } from 'react';
import { StoreContext } from '../contexts/coffee-stores/coffee-stores.context';

const useTrackLocation = () => {
  const { dispatch } = useContext(StoreContext);
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  //   const [latLong, setLatLong] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: 'SET_LAT_LONG',
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMsg('');
    setIsLocating(false);
  };

  const error = () => {
    setIsLocating(false);
    setLocationErrorMsg('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser');
      setIsLocating(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMsg,
    isLocating,
  };
};

export default useTrackLocation;
