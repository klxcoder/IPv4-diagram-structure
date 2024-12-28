import { useState } from 'react'
import styles from './IP.module.scss'
import backgroundColors from './background-colors.module.scss'

const IP_VERSION = [0, 1, 0, 0]

const getBitsUI = (
  bits: number[],
  css: string,
  onClick: (index: number) => void,
) => bits.map((bit, index) => (
  <button
    className={backgroundColors[css]}
    onClick={() => onClick(index)}
  >{bit}</button>
))

const getReverseFn = (
  value: number[],
  setValue: React.Dispatch<React.SetStateAction<number[]>>
) => (index: number) => {
  const newValue: number[] = [...value]
  newValue[index] = newValue[index] === 0 ? 1 : 0
  setValue(newValue)
}

function IP() {
  // Internet Header Length
  const [ihl, setIhl] = useState<number[]>([0, 1, 1, 1])
  // Type of Service
  const [tos, setTos] = useState<number[]>(new Array(8).fill(0))
  // All the bits
  const [tl, setTl] = useState<number[]>(new Array(16).fill(0))
  // Identification
  const [id, setId] = useState<number[]>(new Array(16).fill(0))
  // Fragment offset
  const [fragOff, setfragOff] = useState<number[]>(new Array(16).fill(0))
  // Time To Live
  const [ttl, setTtl] = useState<number[]>(new Array(8).fill(0))
  // Protocol
  const [protocol, setProtocol] = useState<number[]>(new Array(8).fill(0))
  // Header Checksum
  const [checksum, setChecksum] = useState<number[]>(new Array(16).fill(0))
  // Source Address
  const [source, setSource] = useState<number[]>(new Array(32).fill(0))
  // Destination Address
  const [destination, setDestination] = useState<number[]>(new Array(32).fill(0))

  return (
    <div className={styles.ip}>
      {getBitsUI(IP_VERSION, 'version', () => { })}
      {getBitsUI(ihl, 'ihl', getReverseFn(ihl, setIhl))}
      {getBitsUI(tos, 'tos', getReverseFn(tos, setTos))}
      {getBitsUI(tl, 'tl', getReverseFn(tl, setTl))}
      {getBitsUI(id, 'id', getReverseFn(id, setId))}
      {getBitsUI(fragOff, 'fragOff', getReverseFn(fragOff, setfragOff))}
      {getBitsUI(ttl, 'ttl', getReverseFn(ttl, setTtl))}
      {getBitsUI(protocol, 'protocol', getReverseFn(protocol, setProtocol))}
      {getBitsUI(checksum, 'checksum', getReverseFn(checksum, setChecksum))}
      {getBitsUI(source, 'source', getReverseFn(source, setSource))}
      {getBitsUI(destination, 'destination', getReverseFn(destination, setDestination))}
    </div>
  )
}

export default IP
