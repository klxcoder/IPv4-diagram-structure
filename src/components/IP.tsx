import { useState } from 'react'
import styles from './IP.module.scss'
import backgroundColors from './background-colors.module.scss'

const IP_VERSION = [0, 1, 0, 0]

const getDiagramBits = (
  bits: number[],
  css: string,
  onClick: (index: number) => void,
) => bits.map((bit, index) => (
  <button
    key={index}
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
      <div className={styles.IpDiagram}>
        <div className={styles.title}>
          Diagram
        </div>
        <div className={styles.diagram}>
          {getDiagramBits(IP_VERSION, 'version', () => { })}
          {getDiagramBits(ihl, 'ihl', getReverseFn(ihl, setIhl))}
          {getDiagramBits(tos, 'tos', getReverseFn(tos, setTos))}
          {getDiagramBits(tl, 'tl', getReverseFn(tl, setTl))}
          {getDiagramBits(id, 'id', getReverseFn(id, setId))}
          {getDiagramBits(fragOff, 'fragOff', getReverseFn(fragOff, setfragOff))}
          {getDiagramBits(ttl, 'ttl', getReverseFn(ttl, setTtl))}
          {getDiagramBits(protocol, 'protocol', getReverseFn(protocol, setProtocol))}
          {getDiagramBits(checksum, 'checksum', getReverseFn(checksum, setChecksum))}
          {getDiagramBits(source, 'source', getReverseFn(source, setSource))}
          {getDiagramBits(destination, 'destination', getReverseFn(destination, setDestination))}
        </div>
      </div>
      <div className={styles.IpExplain}>
        <div className={styles.title}>
          Explain
        </div>
        <div className={styles.explain}>
          <div>IP Version</div>
          <div>{IP_VERSION.join('')}</div>
          <div>Internet Header Length</div>
          <div>{ihl.join('')}</div>
        </div>
      </div>
    </div>
  )
}

export default IP
