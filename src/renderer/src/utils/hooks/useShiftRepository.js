import { useQuery } from 'react-query'
import ShiftRepository from '../../repositories/ShiftRepository'

export const useGetShifts = () => {
  return useQuery(['shifts'], async () => {
    const { data: results } = (await ShiftRepository.getAll()).data

    return results
  })
}
