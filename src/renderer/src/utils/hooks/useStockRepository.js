import { useMutation, useQuery } from 'react-query'
import StockRepository from '../../repositories/StockRepository'

export const useGetStocks = (search) => {
  return useQuery(['stock', search], async () => {
    const { data: results } = (await StockRepository.getStocks(search)).data

    return results
  })
}

export const useGetStock = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (code) => StockRepository.getStock(code),
    onSuccess,
    onError
  })
}
