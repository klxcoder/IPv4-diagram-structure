export const BinToDec = (bin: number[]) => bin.length > 0 ? parseInt(bin.join(''), 2) : 0

const DecToBin = (dec: number, length: number) => {
  const arr: number[] = []
  while (dec > 0 || arr.length < length) {
    arr.push(dec % 2)
    dec = Math.floor(dec / 2)
  }
  return arr.reverse()
}

export const getChecksum: (
  IP_VERSION: number[],
  ihl: number[],
  tos: number[],
  tl: number[],
  id: number[],
  flags: number[],
  fragOff: number[],
  ttl: number[],
  protocol: number[],
  source: number[],
  destination: number[],
  options: number[],
) => number[] = (
  IP_VERSION, ihl, tos, tl, id, flags, fragOff, ttl, protocol, source, destination, options,
) => {
    const bits: number[] = [...IP_VERSION, ...ihl, ...tos, ...tl, ...id, ...flags, ...fragOff, ...ttl, ...protocol, ...source, ...destination, ...options]
    let sum = 0
    let index = 0;
    while (index < bits.length) {
      sum += BinToDec(bits.slice(index, index + 16))
      if (sum > 0xFFFF) sum = sum - 0xFFFF
      index += 16;
    }
    const checksum = DecToBin(sum, 16).map(bit => bit === 1 ? 0 : 1)
    return checksum
  }