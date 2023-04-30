import { useMutation, useQuery } from 'react-query'
import SaleRepository from '../../repositories/SaleRepository'

export const useNewSale = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (body) => SaleRepository.addSale(body),
    onSuccess,
    onError
  })
}

export const useAddByShift = (onSuccess, onError) => {
  return useMutation({
    mutationFn: ({ shiftId, documentType }) => SaleRepository.adddByShift(shiftId, documentType),
    onSuccess,
    onError
  })
}

export const useNewOutgoing = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (body) => SaleRepository.addOutgoing(body),
    onSuccess,
    onError
  })
}

export const useGetSales = (date) => {
  return useQuery(['sales', date], async () => {
    const personal = await window.api.getStoreValue('personal')

    const { data: results } = (await SaleRepository.getAll(date, personal.userId)).data

    return results
  })
}

export const useGetSaleEndDay = () => {
  return useQuery(['user-sales'], async () => {
    const { data: results } = (await SaleRepository.getSaleEndDay()).data

    return results
  })
}
