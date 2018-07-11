export const googleMapInitialize = () => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1lNj86B9jFJR9SVHa04UlXblzRt7sQkA';
  script.async = true;
  script.onload = resolve;
  document.body.appendChild(script);
});

