import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setSort, sortValues } from '../../redux/slices/sortProductSlice'
import stylesSort from './sortBar.module.scss'

export function SortBar() {
  const sortValue = useSelector((store) => store.sort.value)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams({ sort: sortValue })

  useEffect(() => {
    if (searchParams.get('sort')) {
      dispatch(setSort(searchParams.get('sort')))
    }
  }, [])

  const changeSortHandler = (value) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort: value,
    })
    dispatch(setSort(value))
  }

  return (
    <div className={`${stylesSort.container} navbar bg-base-100`}>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.POPULAR && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.POPULAR)} type="button">Популярные</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.NEWEST && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.NEWEST)} type="button">Новые</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.PRICE_LOW && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.PRICE_LOW)} type="button">Низкая цена</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.PRICE_HIGH && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.PRICE_HIGH)} type="button">Высокая цена</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.RATE && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.RATE)} type="button">По рейтингу</button>
      <button className={`btn btn-ghost btn-sm ${sortValue === sortValues.DISCOUNT && 'btn-active'}`} onClick={() => changeSortHandler(sortValues.DISCOUNT)} type="button">По скидке</button>
    </div>
  )
}
