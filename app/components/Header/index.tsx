
import { Switch } from '@headlessui/react'

import { useState } from 'react' 
export default function Header ({ onClickChange }:{onClickChange: () => void;}) { 
  
    const [enabled, setEnabled] = useState(false)
    const switchChange =()=>{
      setEnabled(!enabled)
      onClickChange()
    }
    return (
      <div className='flex justify-center items-end my-3 w-full  px-5'>
        <p className="font-bold text-5xl h-full w-full text-blue-500 ">Locator</p>
          <Switch
          checked={enabled}
          onChange={switchChange}
          className={`${enabled ? 'bg-blue-500' : 'bg-gray-500'}
            relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
              pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    )
  }

 

 