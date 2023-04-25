import { useMutation, useQuery } from 'react-query'
import SaleRepository from '../../repositories/SaleRepository'

export const useNewSale = (onSuccess, onError) => {
  return useMutation((body) => SaleRepository.addSale(body), {
    onError,
    onSuccess
  })
}

export const useAddByShift = (onSuccess, onError) => {
  return useMutation((shiftId) => SaleRepository.adddByShift(shiftId), {
    onSuccess,
    onError
  })
}

export const useNewOutgoing = (onSuccess, onError) => {
  return useMutation((body) =>
    SaleRepository.addOutgoing(body, {
      onSuccess,
      onError
    })
  )
}

export const useGetSales = (date) => {
  return useQuery(['sales', date], async () => {
    const personal = await window.api.getStoreValue('personal')

    const { data: results } = (await SaleRepository.getAll(date, personal.userId)).data

    return results
  })
}
