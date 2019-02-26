import OTP from '..'
import { toBase32 } from '../crypto_utils'

const secret = '12345678901234567890'

const table = [
  {
    epoch: 59,
    counter: '0000000000000001',
    token: '94287082',
    algorithm: 'SHA1'
  },
  {
    epoch: 59,
    counter: '0000000000000001',
    token: '46119246',
    algorithm: 'SHA256'
  },
  {
    epoch: 59,
    counter: '0000000000000001',
    token: '90693936',
    algorithm: 'SHA512'
  },
  {
    epoch: 1111111109,
    counter: '00000000023523EC',
    token: '07081804',
    algorithm: 'SHA1'
  },
  {
    epoch: 1111111109,
    counter: '00000000023523EC',
    token: '68084774',
    algorithm: 'SHA256'
  },
  {
    epoch: 1111111109,
    counter: '00000000023523EC',
    token: '25091201',
    algorithm: 'SHA512'
  },
  {
    epoch: 1111111111,
    counter: '00000000023523ED',
    token: '14050471',
    algorithm: 'SHA1'
  },
  {
    epoch: 1111111111,
    counter: '00000000023523ED',
    token: '67062674',
    algorithm: 'SHA256'
  },
  {
    epoch: 1111111111,
    counter: '00000000023523ED',
    token: '99943326',
    algorithm: 'SHA512'
  },
  {
    epoch: 1234567890,
    counter: '000000000273EF07',
    token: '89005924',
    algorithm: 'SHA1'
  },
  {
    epoch: 1234567890,
    counter: '000000000273EF07',
    token: '91819424',
    algorithm: 'SHA256'
  },
  {
    epoch: 1234567890,
    counter: '000000000273EF07',
    token: '93441116',
    algorithm: 'SHA512'
  },
  {
    epoch: 2000000000,
    counter: '0000000003F940AA',
    token: '69279037',
    algorithm: 'SHA1'
  },
  {
    epoch: 2000000000,
    counter: '0000000003F940AA',
    token: '90698825',
    algorithm: 'SHA256'
  },
  {
    epoch: 2000000000,
    counter: '0000000003F940AA',
    token: '38618901',
    algorithm: 'SHA512'
  },
  {
    epoch: 20000000000,
    counter: '0000000027BC86AA',
    token: '65353130',
    algorithm: 'SHA1'
  },
  {
    epoch: 20000000000,
    counter: '0000000027BC86AA',
    token: '77737706',
    algorithm: 'SHA256'
  },
  {
    epoch: 20000000000,
    counter: '0000000027BC86AA',
    token: '47863826',
    algorithm: 'SHA512'
  }
]

describe('RFC 6238', () => {
  table.forEach(entry => {
    test(`[${entry.epoch} + ${entry.algorithm}] => ${entry.token}`, () => {
      const otp = new OTP(toBase32(secret), {
        algorithm: entry.algorithm,
        digits: 8,
        period: 30,
        epoch: entry.epoch * 1000
      })

      const result = otp.getToken()
      expect(result).toBe(entry.token)
    })
  })
})
