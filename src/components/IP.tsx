import styles from './IP.module.scss'

function IP() {

  const bits: number[] = new Array(100).fill(0);

  return (
    <div className={styles.ip}>
      {bits.map(bit => (
        <button className={styles.bit}>{bit}</button>
      ))}
    </div>
  )
}

export default IP
