import  { ChangeEvent } from 'react'
import { cuisineList } from "@/config/restaurant-options-config"
import { Label } from './ui/label';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
    onChange: (cuisines: string[]) => void;  //
    selectedCuisines: string[]; //contains all the selected the cuisines
    isExpanded: boolean;
    onExpanded: () => void;
}

const CuisineFilter = ({ onChange, selectedCuisines, isExpanded, onExpanded }: Props) => {

    const handleCuisinesFilter = () => onChange([])

    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCuisine = event.target.value;
        const isChecked = event.target.checked;

        const newCuisineList = isChecked
            ? [...selectedCuisines, clickedCuisine]
            : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)

        onChange(newCuisineList)
    }
    return (
        <div>
            <div className="flex items-center justify-between px-2 mb-2">
                <div className="text-md">Filter By Cuisines</div>
                <div onClick={handleCuisinesFilter} className='text-md font-bold underline'>
                    Reset Filter
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine) => {
                    const isSelected = selectedCuisines.includes(cuisine); //return a boolean
                    return <div className='flex'>
                        <input
                            id={`cuisine_${cuisine}`}
                            type="checkbox"
                            className='hidden'
                            value={cuisine}
                            checked={isSelected}
                            onChange={handleCuisinesChange}
                        />
                        <Label
                            htmlFor={`cuisine_${cuisine}`}
                            className={`flex flex-1 items-center cursor-pointer text-sm rounded-lg px-4 py-2 
                            ${isSelected ?
                                    'border border-green-800 text-green-600'
                                    : "border border-black"}`}
                        >
                            {isSelected && <Check size={20} strokeWidth={4} />}
                            {cuisine}
                        </Label>
                    </div>
                })}

                <Button variant="link" className='mt-4' onClick={onExpanded}>
                    {isExpanded ?
                        (<span className="flex items-center"> View Less <ChevronUp /> </span>)
                        : (<span className='flex items-center'>View More <ChevronDown /></span>)
                        }
                </Button>
            </div>
        </div>
    )
}

export default CuisineFilter 