import { useMutation } from 'react-query'
import AuthRepository from '../../repositories/AuthRepository'

export const useAuthLogin = (onSuccess, onError) => {
  return useMutation(({ username, password }) => AuthRepository.login(username, password), {
    onSuccess,
    onError
  })
}
