import React from 'react';
//主模块
import { Map, Navigation,Marker  } from "rc-bmap";
const markerPoint = {
	  lng: 116.404,
	  lat: 39.915
	};
const centerPoint = { lng: 116.372074, lat: 39.967488 };
export default class Zhizhu extends React.Component {

  constructor(props) {
    super(props);
  }

  
  render() {
  	
    return (
      <Map center={centerPoint} zoom={12}>
      		<Marker point={markerPoint} />
      		<Navigation ></Navigation>
      </Map>
    );
  }
}