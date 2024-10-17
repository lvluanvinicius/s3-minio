import { transformSearchParams } from '@/utils/urls'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import {
  RiArrowLeftDoubleFill,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from 'react-icons/ri'

export function Paginate() {
  const router = useRouter()

  const handlePageChange = useCallback(
    (page: string) => {
      router.query.page = page
      if (page === '1' || page === '0') {
        delete router.query.page
      }

      const queryParams = transformSearchParams(router.query)

      router.push({
        pathname: router.pathname,
        query: queryParams,
      })
    },
    [router],
  )

  const updatePage = useCallback(
    function (action: string) {
      const currentPage = router.query as { page: string | null }

      switch (action) {
        case 'previous':
          if (currentPage.page) {
            const page = parseInt(currentPage.page)

            handlePageChange((page - 1).toString())
          }
          break

        case 'first':
          handlePageChange('1')

          break

        case 'last':
          handlePageChange((5).toString())

          break

        case 'next':
          if (currentPage.page) {
            const page = parseInt(currentPage.page)

            const change = page + 1

            if (change > 5) {
              return
            }

            handlePageChange(change.toString())
          } else {
            handlePageChange((2).toString())
          }

          break

        default:
          break
      }
    },
    [router.query, handlePageChange],
  )

  return (
    <div className="w-full rounded-md bg-content2 px-2 py-2">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <p>Página 1 de 4</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            title="Voltar página anterior."
            onClick={() => updatePage('previous')}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-content1"
          >
            <RiArrowLeftDoubleFill size={20} />
          </button>
          <button
            title="Voltar para a primeira página."
            onClick={() => updatePage('first')}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-content1"
          >
            <RiArrowLeftSLine size={20} />
          </button>
          <button
            title="It para última página."
            onClick={() => updatePage('last')}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-content1"
          >
            <RiArrowRightSLine size={20} />
          </button>
          <button
            title="Avançar para a próxima página."
            onClick={() => updatePage('next')}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-content1"
          >
            <RiArrowRightDoubleFill size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
