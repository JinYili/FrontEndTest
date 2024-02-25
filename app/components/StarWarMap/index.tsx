import { People  as IPeople, Point as IPoint} from '../../types'  
import { GoogleMap,  InfoWindow } from '@react-google-maps/api';   
import PeopleMarker from '../Marker';

export default function StarWarMap ({ selectMarker ,userPoint,points,onMapClick,markerClickHandler }:
    {selectMarker:IPeople|undefined, userPoint:IPoint|undefined, points:IPoint[], 
      onMapClick:(e:google.maps.MapMouseEvent) => void, markerClickHandler:(point:IPoint) => void }) { 
  
  return (
    
    <GoogleMap
    mapContainerStyle={{
      width: '99vw',
      height: '50vh',
    }}
    center={{lat: 30,lng: 0 }}
    onClick={onMapClick}
    zoom={3}
    options={{scrollwheel:false,draggable:false,gestureHandling: 'greedy', fullscreenControl:false, zoomControl:false,streetViewControl:false}}
  >
    {
      points && points.map((p:IPoint)=><PeopleMarker point={p} key={p.id}  onClickHandler={markerClickHandler}/>) 
    }
    {
      userPoint && <PeopleMarker point={userPoint} isUser={true} onClickHandler={()=>{}}/> 
    }
    {
      selectMarker &&  
      <InfoWindow position={selectMarker.position}>  
        <img src={selectMarker.image}  className='rounded-xl w-16 h-16' />
      </InfoWindow>
    }
  </GoogleMap>
  )
}

 

 