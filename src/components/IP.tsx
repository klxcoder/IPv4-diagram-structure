import { useState } from 'react';
import styles from './IP.module.scss'

const IP_VERSION = [0, 1, 0, 0];

const getBitsUI = (bits: number[], css: string) => bits.map(bit => (
  <button className={styles[css]}>{bit}</button>
))

function IP() {
  // Internet Header Length
  const [ihl, setIhl] = useState<number[]>([0, 1, 1, 1]);
  // Type of Service
  const [tos, setTos] = useState<number[]>(new Array(8).fill(0));
  // All the bits
  const [tl, setTl] = useState<number[]>(new Array(16).fill(0));

  return (
    <div className={styles.ip}>
      {getBitsUI(IP_VERSION, 'version')}
      {getBitsUI(ihl, 'ihl')}
      {getBitsUI(tos, 'tos')}
      {getBitsUI(tl, 'tl')}
    </div>
  )
}

export default IP
