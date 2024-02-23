import { Point } from '../../types' 
 import { Marker } from '@react-google-maps/api';  
export default function PeopleMarker ({ point, isUser=false, onClickHandler }:{point:Point, isUser?:boolean, onClickHandler:(id:Point) => void;}) { 
    return (
      isUser?  <Marker 
      position={{ 
        lat: point.lat,
        lng: point.long 
      }}
      />: <Marker 
      position={{ 
        lat: point.lat,
        lng: point.long 
      }}
      icon= {{url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
 
      }
      onClick={()=>onClickHandler(point)}
      />
    )
  }

 
 