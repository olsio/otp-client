import base32 from 'thirty-two'
import crypto from 'crypto'
import leftPad from 'left-pad'

const hexToInt = hex => {
  return parseInt(hex, 16)
}

const prepareCounter = counter => {
  const hexCounter = parseInt(counter, 10).toString(16)
  const paddedCounter = leftPad(hexCounter, 16, 0)
  return Buffer.from(paddedCounter, 'hex')
}

const toBase32 = value => {
  return base32
    .encode(value)
    .toString()
    .replace(/=/g, '')
}

const prepareSecret = (secret, algorithm) => {
  const hexSecret = base32.decode(secret).toString('hex')
  const paddedSecret = padSecret(hexSecret, algorithm)
  return paddedSecret
}

const padSecret = (secret, algorithm) => {
  const encoded = Buffer.from(secret, 'hex')

  switch (algorithm) {
    case 'sha1':
      return padBuffer(encoded, 20)
    case 'sha256':
      return padBuffer(encoded, 32)
    case 'sha512':
      return padBuffer(encoded, 64)
    default:
      return encoded
  }
}

const padBuffer = (secretBuffer, size) => {
  while (secretBuffer.length < size && secretBuffer.length != 0) {
    secretBuffer = Buffer.concat([secretBuffer, secretBuffer])
  }
  return Buffer.from(secretBuffer, 'hex').slice(0, size)
}

const generateToken = (counter, algorithm, secret, digits) => {
  const cryptoHmac = crypto.createHmac(
    algorithm,
    prepareSecret(secret, algorithm)
  )
  const hmac = cryptoHmac.update(prepareCounter(counter)).digest('hex')
  const offset = hexToInt(hmac.substr(hmac.length - 1))
  const truncatedHash = hmac.substr(offset * 2, 8)
  const sigbit0 = hexToInt(truncatedHash) & hexToInt('7fffffff')
  const token = sigbit0 % Math.pow(10, digits)
  return leftPad(token, digits, 0)
}

export { toBase32, generateToken, hexToInt, padSecret, padBuffer }
