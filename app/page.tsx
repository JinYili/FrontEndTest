'use client'
import { useState, useEffect } from 'react' 
import useSWR from 'swr'
import { People as IPeople, Point as IPoint } from './types';
import { GoogleMap, useJsApiLoader , InfoWindow } from '@react-google-maps/api';  
import People from './components/People';
import PeopleMarker from './components/Marker';
import { getDistance } from 'geolib';
 
const fetcher = (url:string) => fetch(url).then((res) => res.json());
export default function Home() {
 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:  process.env['NEXT_PUBLIC_GOOGLE_MAP_KEY'] ||''
  })
 
  const { data:points, error } = useSWR('api/secret', fetcher)
  const [people, setPeople] = useState<IPeople[]>()
  const [userPoint, setUserPoint] = useState<IPoint>()
  const [selectMarker, setSelectedMarker] = useState<IPeople>()
  useEffect(() => {
    const newCalculatedPeople = userPoint && people && people.map(person=>{
      const foundPoint = points.find((point:IPoint)=>point.id===person.id)
      return {...person, distance: getDistance({ 
        latitude:userPoint.lat,
        longitude:userPoint.long
      },{
        latitude:foundPoint.lat,
        longitude:foundPoint.long
      })}
    })
    setPeople(newCalculatedPeople)
  }, [userPoint])
  
useEffect(() => {
  const getPeople =async ()=>{
    const promises:any = []  ;
    points?.forEach((p:IPoint)=>{
      const promise = fetch(`api/people/${p.id}`).then(async r=> await r.json())
      promises.push(promise)
    })
    const data:IPeople[] = await Promise.all(promises) 
    setPeople(data)
  }
    points && getPeople() 
}, [points])
 
const onMapClick = (e:google.maps.MapMouseEvent) => {
  setUserPoint(
    {
      id: -1,
      lat: e.latLng && e.latLng.lat() ||0,
      long: e.latLng&& e.latLng.lng()||0,
    }
  );
};
 
const openWindowById =(id:number)=>{
  const find = people && people.find(person =>person.id=id) 
  if(find){
    const win = window.open(find.wiki, '_blank');
    win && win.focus();
  }
}

const markerClickHandler =(point:IPoint)=>{
   const findPerson = people?.find(p=>p.id===point.id)
   findPerson && setSelectedMarker({...findPerson, position:{lat:point.lat , lng:point.long}})
}

  return (
    <main className="flex min-h-screen flex-col items-center h-full">
      <div className=" flex justify-center font-bold text-5xl my-3 h-auto w-full text-blue-500 ">Locator</div>
     { isLoaded && !error &&
      <GoogleMap
        mapContainerStyle={{
          width: '100vw',
          height: '50vh',
        }}
        center={{lat: 30,lng: 0 }}
        onClick={onMapClick}
        zoom={3}
        options={{scrollwheel:false,draggable:true,gestureHandling: 'greedy', fullscreenControl:false, zoomControl:false,streetViewControl:false}}
      >
        {
           points &&   points.map((p:IPoint)=>
            <PeopleMarker point={p} key={p.id}  onClickHandler={markerClickHandler}/> 
          ) 
        }
        {
          userPoint && <PeopleMarker point={userPoint} isUser={true} onClickHandler={()=>{}}/> 
        }
        {
            selectMarker &&  
            <InfoWindow position={selectMarker.position}>
            <p className='text-xl font-semibold text-blue-500'>{selectMarker.name}</p>
            </InfoWindow>
        }
     
      </GoogleMap>
  }
    {
      people&&  userPoint?
      <div className='h-auto w-full mt-5  grid gap-4 grid-cols-2'>
      {people.sort((a,b)=>a.distance - b.distance).map(p=><People people={p} key={p.name}  onClick={openWindowById}/>)}
      </div>:<div className='mt-10 text-4xl font-bold my-10 text-red-500'>Please click map to point your current location</div>
    }
    </main>
  )
}
