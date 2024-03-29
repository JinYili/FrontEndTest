import { People  as IPeople} from '../../types' 
import Image from 'next/image';
import { useSelector } from 'react-redux'
export default function People ({ people,onClick }:{people:IPeople, onClick: (id:number) => void;}) { 
  
    const light = useSelector((state:any) => state.theme.value)
    return (
        <div className={`w-auto mb-3 rounded-2xl h-48 border-4 flex flex-row cursor-pointer ${light?'bg-slate-200 text-black border-slate-500 hover:border-blue-500 hover:text-blue-500':' text-yellow-500 border-yellow-500 bg-black hover:border-red-600 hover:text-red-600 '}`} onClick={()=>onClick(people.id)}>
          <div className='h-full w-1/4 relative ' title={people.cybernetics || people.name}>
            <Image src={people.image} alt={people.name} sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' fill={true} className='rounded-l-xl' />
          </div>
          <div className='h-full w-3/4 pl-5 pt-5 flex flex-col  rounded-r-xl'>
            <p>Name : {people.name} </p>
            <div className='flex flex-row'><p className='w-1/2'>{`Height: ${people.height}`}</p><p>{`Mass: ${people.mass}`}</p></div>
            <div className='flex flex-row'><p className='w-1/2'>{`Gender: ${people.gender}`}</p><p>{`EyeColor: ${people.eyeColor}`}</p></div>
            <div className='flex flex-row'><p className='w-1/2'>{`Home World: ${people.homeworld}`}</p><p>{`Species: ${people.species}`}</p></div>
            <div className='flex flex-row'><p className='w-1/2'>{`Hair Color: ${people.hairColor}`}</p><p>{`Skin Color: ${people.skinColor}`}</p></div>
            <div className=''><p>{`Distance: ${people.distance/1000 || 0} KM`}</p></div>
          </div>
        </div>
    )
  }

 

 