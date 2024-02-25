import { People  as IPeople, Point as IPoint} from '../../types'  
import { useSelector } from 'react-redux'
import People from '../People'
export default function List ({ people ,userPoint }:{people:IPeople[]|undefined, userPoint:IPoint|undefined }) { 
  
  const openWindowById =(id:number)=>{
    const find = people && people.find(person =>person.id=id) 
    if(find){
      const win = window.open(find.wiki, '_blank');
      win && win.focus();
    }
  }

  const light = useSelector((state:any) => state.theme.value)

  return (
    
      people &&  userPoint?
      <div className='h-auto w-full mt-5 grid gap-4 grid-cols-1 xl:grid-cols-2'>
        {people.sort((a,b)=>a.distance - b.distance).map(p=><People people={p} key={p.name}  onClick={openWindowById}/>)}
      </div>
      :
      <div className={`mt-10 text-4xl font-bold my-10 ${light? 'text-white':'text-yellow-500'}`}>Please click map to point your current location</div>
    
  )
}

 

 