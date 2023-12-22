import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const useFormMethods = useForm<LoginForm>()
  const { handleSubmit, register } = useFormMethods

  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data: LoginForm) {
    await signIn(data)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <FormProvider {...useFormMethods}>
          <Box
            component="form"
            onSubmit={handleSubmit(handleSignIn)}
            sx={{ mt: 1 }}
          >
            <TextField
              {...register('email')}
              margin="normal"
              required
              fullWidth
              label="E-mail"
              name="email"
            />
            <TextField
              {...register('password')}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logar
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  )
}
