import { transformSearchParams } from '@/utils/urls'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Spinner } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schemaSearch = z.object({
  search: z.string(),
})

type SearchType = z.infer<typeof schemaSearch>

export function Search() {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SearchType>({
    resolver: zodResolver(schemaSearch),
    defaultValues: router.query,
  })

  const handlePageChange = useCallback(
    (search: string | null) => {
      if (!search) {
        delete router.query.search
      }

      router.query.search = search as string

      const queryParams = transformSearchParams(router.query)

      router.push({
        pathname: router.pathname,
        query: queryParams,
      })
    },

    [router],
  )

  const handlerSearch = useCallback(
    function ({ search }: SearchType) {
      handlePageChange(search)
    },
    [handlePageChange],
  )

  return (
    <form
      className="flex w-full items-center gap-4"
      onSubmit={handleSubmit(handlerSearch)}
    >
      <Input
        placeholder="Buscar arquivo..."
        className="rounded-sm shadow-sm shadow-black/20"
        radius="sm"
        {...register('search')}
      />
      <Button
        radius="sm"
        type="submit"
        disabled={isSubmitting}
        className="rounded-sm shadow-sm shadow-black/20"
      >
        {isSubmitting ? <Spinner size="sm" /> : 'Buscar'}
      </Button>
    </form>
  )
}
