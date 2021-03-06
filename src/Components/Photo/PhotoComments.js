import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../UserContext'
import styles from './PhotoComments.module.css'
import PhotoCommentsForm from './PhotoCommentsForm'

const PhotoComments = ({ id, comments, single }) => {
  const [stateComments, setStateComments] = useState(() => comments)
  const commentSection = useRef(null)
  const { login } = useContext(UserContext)

  useEffect(() => {
    commentSection.current.scrollTop = commentSection.current.scrollHeight
  }, [stateComments])

  return (
    <>
      <ul
        ref={commentSection}
        className={`${styles.comment} ${single ? styles.single : ''}`}
      >
        {stateComments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author} </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          single={single}
          id={id}
          setStateComments={setStateComments}
        />
      )}
    </>
  )
}

export default PhotoComments
