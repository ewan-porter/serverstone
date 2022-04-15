import "./TrackMap.css"

import React from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default class TrackMap extends React.Component {

    state = {
        tracks: [],
      };

      componentDidMount() {
        axios.get(`http://ergast.com/api/f1/2022/circuits.json`).then((res) => {
          const tracks = res.data.MRData.CircuitTable.Circuits;
          this.setState({ tracks });
        });
      }


      render() {
        return (
          <div>
            <MapContainer center={[51.505, -0.09]} zoom={3}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
    
     {this.state.tracks.map((track) => (
              <Marker
                key={track.circuitId}
                position={[
                  parseInt(track.Location.lat),
                  parseInt(track.Location.long),
                ]}
              > <Popup>
                  <h2>{track.circuitName}</h2>
                </Popup>
              </Marker>
            ))}
                  
               
            </MapContainer>
    
           
          </div>
          // <ul>
          //     {
          //     this.state.tracks
          //         .map(track =>
          //         <li key={track.circuitId}>{track.Location.long}</li>
          //         )
          //     }
          //      {
          //     this.state.tracks
          //         .map(track =>
          //         <li key={track.circuitId}>{track.Location.long}</li>
          //         )
          //     }
          // </ul>
        );
      }
    }
    
    
