
import { useSearchRestaurants } from '@/api/RestaurantApi'
import CuisineFilter from '@/components/CuisineFilter'
import PaginationSelector from '@/components/PaginationSelector'
import SearchBar, { SearchForm } from '@/components/SearchBar'
import SearchResultsCard from '@/components/SearchResultsCard'
import SearchResultsInfo from '@/components/SearchResultsInfo'
import SortOptionDropdown from '@/components/SortOptionDropdown'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
}

const SearchPage = () => {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch"
  })
  const [isExpanded, setIsExpanded] = useState<boolean>(false)


  const { results, isLoading } = useSearchRestaurants(searchState, city)


  //when the page chnages
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }))
  }

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }))

  }

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1
    }))
  }

  //when the search input from the user changes
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }))
  }


  //reset: clear the searchQuery but leave the page number at 1
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }))
  }


  if (!results?.data || !city) {
    return <span>No results found</span>
  }


  if (isLoading) {
    <span>Loading...</span>
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpanded={() => setIsExpanded((prevExpand) => !prevExpand)}
        />
      </div>

      <div id="main-content" className='flex flex-col gap-5'>
        <SearchBar
          searchQuery={searchState.searchQuery} //persist the value the user typed between each render
          onSubmit={setSearchQuery}
          placeholder="Search by Cuisine or Name of Restaurant"
          onReset={resetSearch}
        />
        <div className="flex items-center justify-between">
          <SearchResultsInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            onChange={(value) => setSortOption(value)}
            sortOption={searchState.sortOption} />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultsCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}

        />
      </div>
    </div>
  )
}

export default SearchPage