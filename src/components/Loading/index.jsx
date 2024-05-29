import React from 'react'
import styles from './Loading.module.sass';
import flower from '@img/flower.svg'
import classNames from 'classnames'

function Loading() {
  return (
    <div className={styles.loading}>
      <img src={flower} alt="Loading..." className={classNames(styles.loading_image, 'mb-3')} />
      Loading...
    </div>
  )
}

export default Loading