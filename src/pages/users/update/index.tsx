import { FetchError } from '@/services/app'
import { updateUser } from '@/services/queries/users/update-user'
import { queryClient } from '@/services/queryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Spinner,
  Input,
} from '@nextui-org/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'sonner'
import { z } from 'zod'

interface UpdateProps {
  user: UserInterface
}

const userSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório.'),
  password: z.string().optional(),
  name: z.string().min(1, 'Nome é obrigatório.'),
  email: z.string().min(1, 'E-mail é obrigatório.').email(),
})

type UserType = z.infer<typeof userSchema>

export function Update({ user }: UpdateProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<UserType>({
    defaultValues: user,
    resolver: zodResolver(userSchema),
  })

  const handleUpdate = useCallback(
    async function ({ email, name, username, password }: UserType) {
      try {
        const passwordString = password || null
        const response = await updateUser({
          user: { email, name, username, password: passwordString },
          user_id: user.id,
        })

        if (response && response.status) {
          const userCached = queryClient.getQueriesData<
            ApiResponse<UserInterface[]>
          >({
            queryKey: ['users'],
          })

          userCached.forEach(([cacheKey, cacheData]) => {
            if (!cacheData) {
              return null
            }

            queryClient.setQueryData<ApiResponse<UserInterface[]>>(cacheKey, {
              ...cacheData,
              data: cacheData.data.map((d) => {
                if (d.id === user.id) {
                  d.name = name
                  d.email = email
                  d.username = username
                }
                return d
              }),
            })
          })

          toast.success(response.message)
          onClose()
        }
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
    [onClose, user.id],
  )

  return (
    <>
      <Button onPress={onOpen} variant="ghost" className="" size="sm">
        <FaEdit size={16} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        as={'form'}
        onSubmit={handleSubmit(handleUpdate)}
      >
        <ModalContent>
          <ModalHeader className="border-b border-content2">
            <div>
              <h2>Novo Usuário</h2>
            </div>
          </ModalHeader>
          <ModalBody className="my-4 flex flex-col gap-4">
            <Input
              type="text"
              variant="bordered"
              color="secondary"
              labelPlacement="inside"
              size="md"
              radius="sm"
              label="Nome"
              fullWidth
              placeholder="Informe o nome para o usuário"
              {...register('name')}
            />
            <Input
              type="text"
              variant="bordered"
              color="secondary"
              labelPlacement="inside"
              size="md"
              radius="sm"
              label="E-mail"
              fullWidth
              placeholder="Informe o e-mail para o usuário"
              {...register('email')}
            />
            <Input
              type="text"
              variant="bordered"
              color="secondary"
              labelPlacement="inside"
              size="md"
              radius="sm"
              label="Usuário"
              fullWidth
              placeholder="Informe o usuário para o usuário"
              {...register('username')}
            />
            <Input
              type="password"
              variant="bordered"
              color="secondary"
              labelPlacement="inside"
              size="md"
              radius="sm"
              label="Senha"
              fullWidth
              placeholder="Informe o senha para o usuário"
              {...register('password')}
            />
          </ModalBody>
          <ModalFooter className="">
            <Button type="submit" size="sm" color="success" variant="bordered">
              {isSubmitting ? (
                <>
                  <Spinner size="sm" color="current" />
                  Aguarde...
                </>
              ) : (
                'Atualizar'
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
