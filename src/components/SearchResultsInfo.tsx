
import { Link } from 'react-router-dom';

type Props = {
    total: number;
    city: string;
}

const SearchResultsInfo = ({ city, total }: Props) => {
    return (
        <div className='text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row'>
            <span>
                {total} Restaurants found in {city}
                <Link to="/" className='text-sm ml-2 font underline cursor-pointer text-green-950'>
                    Change Location
                </Link>
            </span>

            {/*Inser sort dropdown */}
        </div>
    )
}

export default SearchResultsInfo