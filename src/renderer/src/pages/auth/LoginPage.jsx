import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Divider,
  Stack
} from '@mui/material'
import { MdLogin } from 'react-icons/md'
import { grey } from '@mui/material/colors'
import React, { useState } from 'react'
import { useAuthLogin } from '../../utils/hooks/useAuthRepository'
import PersonalHelper from '../../utils/helpers/personalHelper'
import { useNavigate } from 'react-router-dom'
import PageLoader from '../../components/common/PageLoader'

const LoginPage = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const navigation = useNavigate()

  const onSuccess = async (response) => {
    const { data: result } = response.data

    const storageData = await window.api.setStoreValue({ key: 'personal', value: result })

    await PersonalHelper.login(storageData)

    navigation('/')
  }

  const { isLoading, mutate: login } = useAuthLogin(onSuccess)

  const handleSubmit = (e) => {
    e.preventDefault()

    login(user)
  }

  return (
    <PageLoader isLoading={isLoading}>
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
