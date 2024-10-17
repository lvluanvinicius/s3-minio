import { FetchError } from '@/services/app'
import { createUser } from '@/services/queries/users/create-user'
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
import { toast } from 'sonner'
import { z } from 'zod'

const userSchema = z.object({
  username: z.string().min(2, 'Usuário é obrigatório.'),
  password: z.string().min(2, 'Senha é obrigatória.'),
  name: z.string().min(2, 'Nome é obrigatório.'),
  email: z.string().min(2, 'E-mail é obrigatório.').email(),
})

type UserType = z.infer<typeof userSchema>

export function Create() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
  })

  const handleCreate = useCallback(
    async function ({ email, name, username, password }: UserType) {
      try {
        if (email === '' || name === '' || username === '' || password === '') {
          throw new Error('Verifique todos os campos e tente novamente.')
        }

        const response = await createUser({
          user: { email, name, username, password },
        })

        if (response && response.status) {
          queryClient.invalidateQueries({
            queryKey: ['users'],
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
    [onClose],
  )

  return (
    <>
      <Button
        onPress={onOpen}
        radius="sm"
        className="rounded-sm shadow-sm shadow-black/20"
      >
        + Novo
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        as={'form'}
        onSubmit={handleSubmit(handleCreate)}
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
                'Criar'
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
