import { useMutation, useQuery } from 'react-query'
import EmployeRepository from '../../repositories/EmployeeRepository'

export const useGetEmployees = () => {
  return useQuery(['employees'], async () => {
    const { data: results } = (await EmployeRepository.getAll()).data

    return results
  })
}

export const useUpdateEmployee = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (obj) => EmployeRepository.update(obj),
    onSuccess,
    onError
  })
}

export const useAddEmployee = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (obj) => EmployeRepository.add(obj),
    onError,
    onSuccess
  })
}

export const useRemoveEmployee = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (id) => EmployeRepository.remove(id),
    onSuccess,
    onError
  })
}
