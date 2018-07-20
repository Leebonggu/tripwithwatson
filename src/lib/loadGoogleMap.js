import axios from 'axios';
import { database } from '../firebase';

export const googleMapInitialize = () => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDrJZi9NHcyvzgPBZmZSt3f1lxvS1fYbOI';
  script.async = true;
  script.onload = resolve;
  document.body.appendChild(script);
});

export const googleStaticMap = () => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDrJZi9NHcyvzgPBZmZSt3f1lxvS1fYbOI';
  script.async = true;
  script.onload = resolve;
  document.body.appendChild(script);
});

//db에 좌표 데이터 넣기
export const googlePlace = (place, url) => {
  const src = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyDrJZi9NHcyvzgPBZmZSt3f1lxvS1fYbOI`;
  axios.get(src).then(({data}) => {
    const placeInfo = data.results[0].geometry.location;
    database.ref().child(url).update({ placeInfo })
  });
}

export const googlePlaceCities = (place, url) => {
  const src = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyDrJZi9NHcyvzgPBZmZSt3f1lxvS1fYbOI`;
  axios.get(src).then(({data}) => {
    const citiesInfo = data.results[0].geometry.location;
    database.ref().child(url).update({ citiesInfo })
  });
}