import { database } from '../firebase';

var data = [];
var userTendencyPlace;

const recur = (obj, element) => {
  if (obj.hasOwnProperty('placeInfo') && element) {
    const placeData = {}
    placeData[element] = obj;
    data.push(placeData);
    return;
  }
  
  Object.keys(obj).forEach(element => {
    if (obj.hasOwnProperty(element)) {
      recur(obj[element], element);
    }
  });
  return data;
};

export const getTravelData = async (userData) => {
  if (userData) {
    const { tendency } = userData;
    const snapshot = await database.ref('travelData').once('value');
    const getPlaceInfo = recur(snapshot.val());
    userTendencyPlace = tendency.map(tendency => {
      return getPlaceInfo.filter((place) => {
        if (place[Object.keys(place)[0]][tendency] === true) {
          return place;
        }
      });
    });
  }

  return userTendencyPlace;
};
