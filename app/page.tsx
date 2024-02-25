'use client'
import { useState, useEffect } from 'react' 
import useSWR from 'swr'
import { People as IPeople, Point as IPoint } from './types';
import {  useJsApiLoader  } from '@react-google-maps/api';   
import List from './components/List'
import Header from './components/Header'
import StarWarMap from './components/StarWarMap'
import { getDistance } from 'geolib';
import store from '../redux/theme'
import { Provider } from 'react-redux' 

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
  const [theme, setTheme] = useState<boolean>(false)
  
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
  

  const markerClickHandler =(point:IPoint)=>{
    const findPerson = people?.find(p=>p.id===point.id)
    findPerson && setSelectedMarker({...findPerson, position:{lat:point.lat , lng:point.long}})
  }

  return (
    <Provider store={store}>
      <main className={`flex   flex-col items-center w-full ${!theme ?'bg-black':'bg-slate-200'}`}>
        <Header themeHelper={()=>{
            setTheme(!theme)
        }}/>
        { isLoaded && !error &&
            <StarWarMap  selectMarker={selectMarker} userPoint={userPoint} 
              points={points} markerClickHandler={markerClickHandler} onMapClick={onMapClick}></StarWarMap>
          }
        <List people={people} userPoint={userPoint} /> 
      </main>
    </Provider>
  )
}
