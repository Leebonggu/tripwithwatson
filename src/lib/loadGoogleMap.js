export const googleMapInitialize = () => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDrJZi9NHcyvzgPBZmZSt3f1lxvS1fYbOI';
  script.async = true;
  script.onload = resolve;
  document.body.appendChild(script);
});

