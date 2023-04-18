import { useMutation, useQuery } from 'react-query'
import EmployeRepository from '../../repositories/EmployeeRepository'

export const useGetEmployees = () => {
  return useQuery(['employees'], async () => {
    const { data: results } = (await EmployeRepository.getAll()).data

    return results
  })
}

export const useUpdateEmployee = (onSuccess, onError) => {
  return useMutation((obj) => EmployeRepository.update(obj), {
    onSuccess,
    onError
  })
}

export const useAddEmployee = (onSuccess, onError) => {
  return useMutation((obj) => EmployeRepository.add(obj), {
    onSuccess,
    onError
  })
}

export const useRemoveEmployee = (onSuccess, onError) => {
  return useMutation((id) => EmployeRepository.remove(id), {
    onSuccess,
    onError
  })
}
