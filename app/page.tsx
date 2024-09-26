'use client'
import { useState, useEffect, SetStateAction } from 'react' 
import { People as IPeople  } from './types'; 
import List from './components/List'
import Header from './components/Header' 
import store from '../redux/theme'
import { Provider } from 'react-redux'  

export default function Home() {
 
  const [searchText, setSearchText] = useState<string>('')
  const [sort, setSort] = useState<{key:string, asc:boolean}|null>(null)
  const [theme, setTheme] = useState<boolean>(true)
  const [people, setPeople] = useState<IPeople[]>([]) 
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(()=>{
    const fetchData =async()=>{
      setIsLoading(true)
      const response = await fetch('api/people').then(async res =>await res.json())
      setIsLoading(false)
      setPeople(response)
    }
    fetchData()
  },[])
 

  const startSorting = (key:string) =>{
    if(sort===null)
      setSort({key,asc:true})
    else
      setSort(prev =>{
        return {key, asc: prev!==null && prev.key !==key? true: !prev?.asc}
      })
  }

  useEffect(()=>{
      if(sort!==null && sort.key==='name')
        setPeople([...sort.asc ? people.sort((a,b) => a.name<b.name  ? -1:1) : people.sort((a,b) => a.name>b.name  ? -1:1)]) 
      else if (sort!==null && sort.key==='email') 
        setPeople([...sort.asc ? people.sort((a,b) => a.email<b.email  ? -1:1) : people.sort((a,b) => a.email>b.email  ? -1:1)]) 
   
  },[sort])
 
  if(isLoading){
    return <div className='text-blue-500 min-h-screen  font-bold text-5xl flex justify-center items-center w-full h-max my-10'>LOADING</div>
  }
  return (
    <Provider store={store}>
       
      <main className={`flex min-h-screen flex-col items-center w-full ${!theme ?'bg-black':'bg-slate-200'}`}>
        <Header themeHelper={()=>{
            setTheme(!theme)
        }}/>
        
        <div className='w-full flex justify-center my-3 h-10'>
          <input name="full_name" className='rounded-xl w-3/4 lg:w-1/3  px-3' onChange={(e)=>setSearchText(e.target.value.trim())} type="text" placeholder='Two letter for searching in name'/>
        </div>
        <div className='w-full flex  justify-between  my-3 h-10 '>
           <button className='bg-blue-600 text-white font-semibold mx-5 rounded-3xl w-1/2 lg:w-1/4' onClick={()=>startSorting('name')}> Sort by Name</button>
           <button className='bg-blue-600 text-white font-semibold mx-5 rounded-3xl w-1/2 lg:w-1/4' onClick={()=>startSorting('email')}> Sort by Email</button>
        </div>

        <List people={people} searchText={searchText.toLowerCase()}/> 
      </main> 
    </Provider>
  )
}
