import {Book as BookType} from '../../types'
import Link from 'next/link'
export default function BookCard ({ book }: IBookCard) { 
   
    return (
        <div  className='h-32 mb-3 p-3 border-gray-400 border-2 rounded-lg hover:border-gray-600 shadow-lg flex flex-col'>
            <div className='w-full h-1/2 flex flex-row justify-around items-center'>
                <div className='w-1/3 h-auto'>Title: {book.title} </div>
                <div className='w-1/3 h-auto '>Author: {book.author}</div>
                <div className='w-1/3 h-auto'>ISBN:{ book.isbns[0].isbn10}</div>
            </div>
            <div className='w-full h-1/2 flex flex-row justify-around   items-center'> 
            <div className='w-1/3 h-auto'>Review: {book.primary_isbn13} </div>
            {
                book.book_review_link?
                <div className='w-1/3 h-auto'>Review Link: <Link className='hover:text-blue-800' href={book.book_review_link}>Click here</Link></div>
                :<div className='w-1/3 h-auto'></div>
            }
            <div className='w-1/3 h-auto'></div>
            </div>
        </div>
    )
  }


  interface IBookCard  {book:BookType}


 