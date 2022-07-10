import { lazy, Suspense, useEffect } from 'react'
import { STATS_GET } from '../../api'
import Error from '../../Helper/Error'
import Head from '../../Helper/Head'
import Loading from '../../Helper/Loading'
import useFetch from '../../Hooks/useFetch'
const UserStatsGraphs = lazy(() => import('./UserStatsGraphs'))

const UserStats = () => {
  const { data, error, loading, request } = useFetch()

  useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET()
      await request(url, options)
    }
    getData()
  }, [request])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data)
    return (
      <Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </Suspense>
    )
  else return null
}

export default UserStats
