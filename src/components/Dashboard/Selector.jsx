import React,{Fragment} from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";


export default function Selector({selected,setSelected,issues}) {
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <Listbox onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                {selected.icon!==undefined?<div className="h-5 w-5 flex-shrink-0 rounded-full">
                                    {selected.icon}
                                </div>:null}
                                {selected.avatar!==undefined?<img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />:null}
                                <span className="ml-3 block truncate">{selected.name}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {issues.map((issue) => (
                                    <Listbox.Option
                                        key={issue.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? "bg-gray-200 text-black" : "text-gray-900",
                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                            )
                                        }
                                        value={issue}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    {issue.icon!==undefined?<div className="h-5 w-5 flex-shrink-0 rounded-full">
                                                        {issue.icon}
                                                    </div>:null}
                                                    {issue.avatar!==undefined?<img src={issue.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />:null}
                                                    <span className={classNames(
                                                            selected ? "font-semibold" : "font-normal",
                                                            "ml-3 block truncate"
                                                        )}
                                                    >
                                                        {issue.name}
                                                    </span>
                                                </div>
                                                {selected ? (
                                                    <span className={classNames(
                                                            active ? "text-indigo-600" : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5"  />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}
