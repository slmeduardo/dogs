import { useEffect } from 'react'
import { PHOTOS_GET } from '../../api'
import Error from '../../Helper/Error'
import Loading from '../../Helper/Loading'
import useFetch from '../../Hooks/useFetch'
import styles from './FeedPhotos.module.css'
import FeedPhotosItem from './FeedPhotosItem'

const FeedPhotos = ({ user, page, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch()

  useEffect(() => {
    async function fetchPhotos() {
      const total = 6
      const { url, options } = PHOTOS_GET({ page, total, user })
      const { res, json } = await request(url, options)
      if (res && res.ok && json.lenght < total) setInfinite(false)
    }
    fetchPhotos()
  }, [request, user, page, setInfinite])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    )
}

export default FeedPhotos
