import { People  as IPeople} from '../../types'  
import { useSelector } from 'react-redux'
export default function People ({ people }:{people:IPeople}) { 
  
    const light = useSelector((state:any) => state.theme.value)
    return (
        <div className={`w-auto mb-3 rounded-2xl h-auto border-4 flex flex-row  ${light?'bg-slate-200 text-black border-slate-500 hover:border-blue-500 hover:text-blue-500':' text-yellow-500 border-yellow-500 bg-black hover:border-red-600 hover:text-red-600 '}`} >
          <div className='h-full w-3/4 pl-5 py-3 flex flex-col  rounded-r-xl'>
            <p>Name : {people.name} </p>
            <div className='flex flex-row'><p className='w-1/2'>{`Email: ${people.email}`}</p><p>{`Phone: ${people.phone}`}</p></div>
            <div className='flex flex-row'><p className='w-1/2'>{`Website: ${people.website}`}</p><p>{`Company: ${people.company.name}`}</p></div>
            <div className='flex flex-row'><p className='w-full'>{`Address: ${people.address.street} ${people.address.suite} , ${people.address.zipcode} , ${people.address.city}`}</p></div>
          </div>
        </div>
    )
  }

 

 