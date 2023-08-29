'use client'
import { Listbox } from '@headlessui/react'
import {ListItem as ListItemType} from '../../types'
 
export default function Selector ({selectedItem , listItem, setSelectedItem }:IDropDownSelector) { 
   

    return (
        <div className="w-full flex flex-row p-5 h-auto  ">
            <div className="px-5 h-12 flex justify-center items-center ">
                Select Name:
            </div>
            <div className="w-96 bg-gray-100 h-12  border-2 border-gray-200 rounded-lg">
            <Listbox value={selectedItem} onChange={(str)=>setSelectedItem(str)}>
                <Listbox.Button className="w-full h-full hover:bg-gray-200">{selectedItem||'- Please Select -'}</Listbox.Button>
                <Listbox.Options>
                    <Listbox.Option
                        key={-1}
                        value={''}
                        className="hover:bg-slate-400 bg-white z-40  relative  opacity-100  flex justify-center items-center cursor-pointer"
                    >
                        - Please Select -
                    </Listbox.Option>
                    {listItem && listItem.map((item,index) => (
                    <Listbox.Option
                        key={index}
                        value={item.list_name}
                        className="hover:bg-slate-400 bg-white z-40  relative  opacity-100  flex justify-center items-center cursor-pointer"
                    >
                        {item.display_name}
                    </Listbox.Option>
                    ))}
                </Listbox.Options>
                </Listbox>
            </div>
        </div>
    )
  }




interface IDropDownSelector {
    selectedItem:string |undefined, 
    listItem: ListItemType[], 
    setSelectedItem:Function
}