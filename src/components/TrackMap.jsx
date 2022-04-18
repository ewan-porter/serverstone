import "./TrackMap.css"

import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useGetScheduleQuery } from "../services/f1Api";
import circuitImages from '../images/circuits/circuitIndex';



const TrackMap = () => {

const {data, isFetching } = useGetScheduleQuery();

const [location, setLocation] = useState();

useEffect(() => {
  setLocation(
    data?.MRData?.RaceTable.Races
  );
},);



if(isFetching) return "Loading...";








  return (
    <>
<MapContainer center={[51.505, -0.09]} zoom={3}>
             <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
            {location?.map((index) => (
                <Marker
                                key={index.raceName}
                                position={[
                                  parseInt(index.Circuit.Location.lat),
                                  parseInt(index.Circuit.Location.long),
                                ]}
                              > <Popup>
                                  <h2>{index.Circuit.circuitName}</h2>
                                  <a href={index.Circuit.url} target="_blank"> <img className="popup-image" src={circuitImages[index.Circuit.circuitId]}></img></a>

                                </Popup>
                              </Marker>
            ))}
 
                  
               
            </MapContainer>
    

    </>
  );
};

export default TrackMap



// export default class TrackMap extends React.Component {

//     state = {
//         tracks: [],
//       };

//       componentDidMount() {
//         axios.get(`http://ergast.com/api/f1/2022/circuits.json`).then((res) => {
//           const tracks = res.data.MRData.CircuitTable.Circuits;
//           this.setState({ tracks });
//         });
//       }


//       render() {
//         return (
//           <div>
//             <MapContainer center={[51.505, -0.09]} zoom={3}>
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
              
    
//      {this.state.tracks.map((track) => (
//               <Marker
//                 key={track.circuitId}
//                 position={[
//                   parseInt(track.Location.lat),
//                   parseInt(track.Location.long),
//                 ]}
//               > <Popup>
//                   <h2>{track.circuitName}</h2>
//                 </Popup>
//               </Marker>
//             ))}
                  
               
//             </MapContainer>
    
           
//           </div>
//           // <ul>
//           //     {
//           //     this.state.tracks
//           //         .map(track =>
//           //         <li key={track.circuitId}>{track.Location.long}</li>
//           //         )
//           //     }
//           //      {
//           //     this.state.tracks
//           //         .map(track =>
//           //         <li key={track.circuitId}>{track.Location.long}</li>
//           //         )
//           //     }
//           // </ul>
//         );
//       }
//     }
    
    
