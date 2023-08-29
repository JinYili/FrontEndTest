'use client'
import {useState, useEffect} from 'react'
import Selector from "./components/DropDownSelector"
import  {ListItem as ListItemType , Book as BookType }from "./types"
import BookCard from './components/BookCard'
export default function Home() { 

  const[items,setItems] = useState<ListItemType[]>([])
  const[selectedItem,setSelectedItem] = useState<string>('')
  const[books,setBooks] = useState<BookType[]>([])
  const [isLoading, setIsLoading]= useState<boolean>(false)
  useEffect(()=>{
    const fetchListName = async()=>{
        const url = 'http://localhost:8000/books/list-name'
        const response = await fetch(url).then(async (data)=>{
            const rows =await data.json();
            return rows.map((row:ListItemType)=>{
              return {list_name:row.list_name, display_name:row.display_name}
            })
        }).catch(()=>setItems([]))
        setItems(response)
    }
    fetchListName()
  },[])

  useEffect(()=>{
    const fetchBestSellBook= async ()=>{
      setIsLoading(true)
      setBooks([])
      const url = `http://localhost:8000?list_name=${selectedItem}`
      await fetch(url).then(async (data:Response)=>await data.json()).then((bookList: BookType[])=>setBooks(bookList)).then(()=> setIsLoading(false)).catch(()=>setBooks([]))
    }
     
    if(selectedItem)
      fetchBestSellBook()
    else setBooks([])
  },[selectedItem])

 
 

  return (
    <main className="flex min-h-screen flex-col items-center h-auto   pt-10">
          <div className=" flex justify-center font-bold text-2xl  h-auto w-full text-blue-800 ">BEST Sell books</div>
           <Selector  listItem={items} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
            {
              isLoading?<div className='w-full h-auto flex justify-center items-center text-3xl font-bold'>Loading...</div>:''
            }
           <div className='w-full h-auto p-5'>
            {
               books.length>0 && books.map((book:BookType,index)=>
                  <BookCard key={index} book={book}/> 
               )
            }
           </div>
    </main>
  )
}
