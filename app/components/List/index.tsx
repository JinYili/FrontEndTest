import { People  as IPeople, Company as ICompany, Address as IAddress} from '../../types'  
import { useSelector } from 'react-redux'
import People from '../People' 
import {RootState as IRootState} from '@/redux/theme'

export default function List ({people=[], searchText =''}:{people:IPeople[], searchText:string }) { 
  const light = useSelector((state:IRootState) => state.theme.value)
   

  const filterAllFields =(person:IPeople,txt:string):boolean=>{
     const output:boolean[] =[];
      Object.keys(person).forEach((key:string)=>{
      const value = person[key as keyof IPeople]; 
      if ( typeof value == 'string' || typeof value == 'number')
        output.push(value.toString().toLowerCase().includes(txt)) 
      else if('name' in value){
        output.push(value['name'].toString().toLowerCase().includes(txt)) 
        output.push(value['catchPhrase'].toString().toLowerCase().includes(txt)) 
        output.push(value['bs'].toString().toLowerCase().includes(txt)) 
      }else if ('city' in value){
        output.push(value['street'].toString().toLowerCase().includes(txt)) 
        output.push(value['city'].toString().toLowerCase().includes(txt)) 
        output.push(value['suite'].toString().toLowerCase().includes(txt)) 
        output.push(value['zipcode'].toString().toLowerCase().includes(txt)) 
      }

    }) 
    return output.find(o=>o===true) || false
  } 
  return (
    
      people.length>0?
      <div className='h-auto w-full mt-2 px-5 grid gap-4 grid-cols-1 xl:grid-cols-2'>
        {people.filter((p:IPeople)=>{ 
          return (searchText.length<2)? true:filterAllFields(p,searchText);
        }).map((p:IPeople)=>{
            return <People people={p} key={p.id}/>
        })}
      </div>
      :
      <div className={`mt-10 text-4xl font-bold my-10 ${light? 'text-black':'text-yellow-500'}`}>Nothing to show</div>
    
  )
}

 

 