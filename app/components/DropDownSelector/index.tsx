'use client'
import { Listbox } from '@headlessui/react'
import {ListItem as ListItemType} from '../../types'
 
export default function Selector ({selectedItem , listItem, setSelectedItem }:IDropDownSelector) { 
    return (
        <div className="w-full flex flex-row p-5 h-auto  ">
   
        </div>
    )
  }

interface IDropDownSelector {
    selectedItem:string |undefined, 
    listItem: ListItemType[], 
    setSelectedItem:Function
}