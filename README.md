# otp-client

otp-client is a JavaScript library for creating OTP tokens for easy use in OTP clients.

The library can be used with react-native and expo.io without native crypto libraries.

## Installation

```
yarn add otp-client
```

## Usage

### Default case

The default configuration uses SHA1 and creates a 6 digit token every 30 seconds.

```js
import OTP from 'otp-client'

const secret = 'TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY'
const otp = new OTP(secret)
const token = otp.getToken() // e.g. 624343
```

### Customizing

The token generation can be customized with the following options:

* **algorithm**: Algorithm used to create the HMAC digest [SHA1, SHA256, SHA512]
* **digits**: Number of digits of the generated token
* **period**: Window lenght for the token in seconds

```js
import OTP from 'otp-client'

const secret = "TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY"
const options = {
  algorithm: "sha256",
  digits: 8,
  period: 20
}

const otp = new OTP(secret, options)
const token = otp.getToken() // e.g. 74837433
```

### Additional methods

`getToken(index)` allows the retrieval of the any past or future tokens by passing the desired index.

```js
import OTP from 'otp-client'

const secret = 'TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY'
const otp = new OTP(secret)
const previousToken = otp.getToken(-1) // e.g. 932243
const currentToken = otp.getToken(0) // e.g. 003230
const nextToken = otp.getToken(1) // e.g. 412313
```

`getTimeUntilNextTick()` returns the remaining seconds until the next token will be generated.

```js
import OTP from 'otp-client'

const secret = 'TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY'
const otp = new OTP(secret)
const secondsUntilNextTokenGetGenerated = otp.getTimeUntilNextTick()
```