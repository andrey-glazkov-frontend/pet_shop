import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import { setSearch } from '../../redux/slices/searchSlice'
import searchStyles from './searchStyles.module.css'

export function HeaderSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [input, setInput] = useState(() => searchParams.get('q') ?? '')

  const dispatch = useDispatch()

  const debounceValue = useDebounce(input, 350)

  useEffect(() => {
    setSearchParams({ q: input })
  }, [input])

  useEffect(() => {
    dispatch(setSearch((debounceValue)))
  }, [debounceValue])

  return (

    <input
      className={searchStyles.search__input}
      type="textfield"
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search"
    />

  )
}
