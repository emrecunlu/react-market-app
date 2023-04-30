import { useMutation, useQuery } from 'react-query'
import OutgoingRepository from '../../repositories/OutgoingRepository'

export const useGetOutgoings = () => {
  return useQuery(['outgoing'], async () => {
    const { data: results } = (await OutgoingRepository.getAll()).data

    return results
  })
}

export const useAddOutgoing = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (obj) => OutgoingRepository.add(obj),
    onSuccess,
    onError
  })
}

export const useUpdateOutgoing = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (obj) => OutgoingRepository.update(obj),
    onSuccess,
    onError
  })
}

export const useRemoveOutgoing = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (id) => OutgoingRepository.remove(id),
    onError,
    onSuccess
  })
}
