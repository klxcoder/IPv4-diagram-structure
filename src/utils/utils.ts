export const BinToDec = (bin: number[]) => bin.length > 0 ? parseInt(bin.join(''), 2) : 0

export const BinToDecIP = (bin: number[]) => `${BinToDec(bin.slice(0, 8))}.${BinToDec(bin.slice(8, 16))}.${BinToDec(bin.slice(16, 24))}.${BinToDec(bin.slice(24, 32))}`

/**
 * Convert a decimal number to a binary array of a given length.
 * The binary array is in big-endian order (most significant bit first).
 * @param dec The decimal number to convert
 * @param length The length of the binary array to return
 */
const DecToBin = (dec: number, length: number) => {
  const arr: number[] = []
  while (dec > 0 || arr.length < length) {
    arr.push(dec % 2)
    dec = Math.floor(dec / 2)
  }
  return arr.reverse()
}

/**
 * Compute the checksum of a list of binary arrays, each representing a part of an IPv4 header.
 * The checksum is computed by summing the 16-bit words of the header and then taking the one's
 * complement of the sum.
 * @param IP_VERSION The version part of the header.
 * @param ihl The Internet Header Length part of the header.
 * @param tos The Type of Service part of the header.
 * @param tl The Total Length part of the header.
 * @param id The Identification part of the header.
 * @param flags The Flags part of the header.
 * @param fragOff The Fragment Offset part of the header.
 * @param ttl The Time To Live part of the header.
 * @param protocol The Protocol part of the header.
 * @param source The Source Address part of the header.
 * @param destination The Destination Address part of the header.
 * @param options The Options part of the header.
 * @returns The checksum of the header.
 */
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