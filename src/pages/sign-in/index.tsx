import Image from 'next/image'
import { Button, Input, Spinner } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCallback } from 'react'
import { FetchError, post } from '@/services/app'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { getAppConfig } from '@/services/queries/app/app-config'
import { useQuery } from '@tanstack/react-query'
import { SkeletonSignIn } from './skeleton'

const signInSchema = z.object({
  username: z.string().min(1, 'Informe o nome de usuário.'),
  password: z.string().min(1, 'Informe a senha.'),
})

type SignInType = z.infer<typeof signInSchema>

export function SignIn() {
  const router = useRouter()

  const { data: config } = useQuery({
    queryKey: ['app-header-settings'],
    queryFn: getAppConfig,
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  })

  const handleSignIn = useCallback(
    async function ({ password, username }: SignInType) {
      try {
        const response = await post(
          '/api/auth/sign-in',
          { password, username },
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )

        if (response.status) {
          return router.push('/home')
        }

        throw new Error(response.message)
      } catch (error) {
        if (error instanceof FetchError) {
          return toast.error(error.message)
        }

        if (error instanceof Error) {
          return toast.error(error.message)
        }

        return toast.error('Houve um erro desconhecido.')
      }
    },
    [router],
  )

  if (!config) {
    return <SkeletonSignIn />
  }

  return (
    <div className="fixed left-[50%] top-[50%] flex h-[28rem] w-[30rem] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-xl bg-primary text-white shadow-md shadow-primary">
      <div className="flex h-[6rem] w-full flex-col items-center justify-center border-b border-white/50">
        <div className="w-[3.5rem]">
          <Image
            src={`/uploads/${config.data.app_logo}`}
            alt={config.data.app_name}
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="w-full py-3 text-center">
        <h2 className="uppercase">Faça login para continuar</h2>
      </div>

      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col gap-4 px-12 text-white"
      >
        <Input
          variant="bordered"
          color={errors.username ? 'danger' : 'secondary'}
          label="Usuário"
          labelPlacement="inside"
          fullWidth
          size="sm"
          type="text"
          radius="md"
          placeholder="Entre com seu usuário"
          {...register('username')}
        />
        <Input
          variant="bordered"
          color={errors.password ? 'danger' : 'secondary'}
          label="Senha"
          labelPlacement="inside"
          fullWidth
          size="sm"
          type="password"
          radius="md"
          placeholder="Entre com sua senha"
          {...register('password')}
        />

        <Button
          type="submit"
          variant="ghost"
          color="secondary"
          className="text-white disabled:bg-secondary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" color="current" />
              <span>Aguarde...</span>
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>

      <div className="flex w-full items-center justify-between px-12">
        <div />
        <a href="mailto:lvluansantos@gmail.com" className="opacity-35">
          S3 Api Content
        </a>
      </div>
    </div>
  )
}
