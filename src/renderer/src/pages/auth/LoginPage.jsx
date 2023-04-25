import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Divider,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { MdLogin } from 'react-icons/md'
import { grey } from '@mui/material/colors'
import React, { useState } from 'react'
import { useAuthLogin } from '../../utils/hooks/useAuthRepository'
import PersonalHelper from '../../utils/helpers/personalHelper'
import { useNavigate } from 'react-router-dom'
import PageLoader from '../../components/common/PageLoader'
import { useGetShifts } from '../../utils/hooks/useShiftRepository'

const LoginPage = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    shift: ''
  })
  const navigation = useNavigate()

  const onSuccess = async (response) => {
    const { data: result } = response.data

    const storageData = await window.api.setStoreValue({
      key: 'personal',
      value: { ...result, shiftId: user.shift }
    })

    await PersonalHelper.login(storageData)

    navigation('/')
  }

  const { isLoading, mutate: login } = useAuthLogin(onSuccess)
  const { data: shifts, isLoading: shiftLoading } = useGetShifts()

  const handleSubmit = (e) => {
    e.preventDefault()

    login(user)
  }

  return (
    <PageLoader isLoading={isLoading || shiftLoading}>
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: grey['100']
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 800 }}>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Typography variant="h6" textAlign="center">
                Hızlı Satış
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Stack direction="column" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="shift-select-label">Vardiya</InputLabel>
                  <Select
                    labelId="shift-select-label"
                    id="shift-select-box"
                    placeholder="Vardiya seçiniz."
                    value={user.shift ?? ''}
                    onChange={(e) => setUser((user) => ({ ...user, shift: e.target.value }))}
                    label="Vardiya"
                  >
                    {shifts?.map((item) => (
                      <MenuItem sx={{ height: 50 }} key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Kullanıcı Adı"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Şifre"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  type="password"
                  fullWidth
                  variant="outlined"
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                disabled={Object.values(user).some((el) => el === '')}
                type="submit"
                sx={{ ml: 'auto' }}
                size="large"
                variant="contained"
                endIcon={<MdLogin />}
              >
                Giriş Yap
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </PageLoader>
  )
}

export default LoginPage
