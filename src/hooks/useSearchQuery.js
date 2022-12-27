import { useSearchParams } from 'react-router-dom'

function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams()

  return {
    searchQueryStr: searchParams.toString(),
    searchQueryObj: Object.fromEntries(searchParams),
    isSearchQuery: !!searchParams.toString(),
    setSearchQuery: setSearchParams,
  }
}

export default useSearchQuery
