import { useState } from 'react'
import { COMMENT_POST } from '../../api'
import { ReactComponent as Send } from '../../Assets/enviar.svg'
import Error from '../../Helper/Error'
import useFetch from '../../Hooks/useFetch'
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setStateComments, single }) => {
  const [comment, setComment] = useState('')
  const { request, error } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    const { url, options } = COMMENT_POST(id, { comment })
    const { res, json } = await request(url, options)
    if (res.ok) {
      setComment('')
      setStateComments((comments) => [...comments, json])
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Adicione um comentario..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Send />
      </button>
      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm
