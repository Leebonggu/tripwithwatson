// db에 좌표 데이터 넣기 위해 사용
import React, { Component } from 'react';
import { database } from '../../firebase';
import { googlePlace, googlePlaceCities } from '../../lib/loadGoogleMap';

class Datas extends Component {
  state = { data: null };

  getDataFromDB = async () => {
    try {
      const snapshot = await database.ref('/travel').once('value');
      this.setState ({ data: snapshot.val() })
    } catch (error) {
      alert('데이터 불러오기 실패스')
    }
  };

  componentDidMount() {
    this.getDataFromDB();
  }

  render() {
    const { data } =  this.state;
    console.log(data)

    return (
      <div>
        {data ? (
          <div>
            {data.forEach((item, index) => {
                const url = `/travel/${index}`;
                googlePlace(item["도시여행정보"], url);
              })
            }
            {data.forEach((item, index) => {
                const url = `/travel/${index}`;
                googlePlaceCities(item["도시"], url);
              })
            }
          </div>
        ) : (
          "loading"
        )
        }
      </div>
    )
  }
}

export default Datas;