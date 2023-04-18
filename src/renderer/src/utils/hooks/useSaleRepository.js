import { useMutation } from 'react-query'
import SaleRepository from '../../repositories/SaleRepository'

export const useNewSale = (onSuccess, onError) => {
  return useMutation((body) => SaleRepository.addSale(body), {
    onError,
    onSuccess
  })
}
   