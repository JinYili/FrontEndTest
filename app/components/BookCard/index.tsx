import {Book as BookType} from '../../types' 
export default function BookCard ({ book }: IBookCard) { 
   
    return (
        <div  className='h-32 mb-3 p-3 border-gray-400 border-2 rounded-lg hover:border-gray-600 shadow-lg flex flex-col'>
            <div className='w-full h-1/2 flex flex-row justify-around items-center'>
                <div className='w-1/3 h-auto'>Title: {book.title} </div>
                <div className='w-1/3 h-auto '>Author: {book.author}</div> 
            </div>
            <div className='w-full h-1/2 flex flex-row justify-around   items-center'> 
            <div className='w-1/3 h-auto'>Review: {book.primary_isbn13} </div>
 
            <div className='w-1/3 h-auto'></div>
            </div>
        </div>
    )
  }


  interface IBookCard  {book:BookType}


 