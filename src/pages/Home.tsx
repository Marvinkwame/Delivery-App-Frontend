import Hero from '@/components/Hero'
import delivery from "../assets/deliver.webp"
import SearchBar, { SearchForm } from '@/components/SearchBar'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`
    })
  }


  return (
    <div className='flex flex-col gap-12'>
      <Hero />
      <div className='bg-green-650 md:px-32 rounded-lg shadow-xl text-center p-8 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold tracking-tight'>DineDirect</h1>
        <SearchBar placeholder="Search By City " onSubmit={handleSearchSubmit} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 py-12 place-items-center">
        <img src={delivery} alt="Delivery" />

        <div className='grid gap-6'>
          <h2 className='text-5xl font-bold text-green-800'>
            Fastest & cheapest food delivery service
          </h2>
          <p className='text-3xl  text-green-600'>
            Get the best quality and most delicious
            foods  delivered to your doorstep in no time!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home