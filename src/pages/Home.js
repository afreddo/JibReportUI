import React, {useState, useEffect} from 'react'
import { Wrapper } from "@googlemaps/react-wrapper";
import { Map } from '../components/Map';
import { Marker } from '../components/Marker';

export default function Home() {
    const [clicks, setClicks] = useState([]);
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [center, setCenter] = React.useState({
      lat: 0,
      lng: 0,
    });

    const onClick = (mouseEvent) => {
      setClicks([mouseEvent.latLng]);
      clicks.map((latlng) => {
          console.log(JSON.stringify(latlng))
      })
    };

    const onIdle = (m) => {
        setZoom(m.getZoom());
        setCenter(m.getCenter().toJSON());
    };

    return(
        <div style = {{ display: 'flex', height: '100vh', width: '100vw'}}>
            <Wrapper apiKey={process.env.REACT_APP_MAPS_API}>
                <Map
                    center = {center}
                    zoom={3}
                    style={{top: '25%',flexGrow: '1', height: "auto%"}}
                    onClick = {onClick}
                    onIdle = {onIdle}
                >
                    {clicks.map((marker)=>{
                        return <Marker position = {marker}></Marker>;
                    })}
                </Map>
            </Wrapper>
        </div>
    )
}