import OTP from "."
import { DEFAULTS } from "."

const secret = "SVD45BCJYTEPXXXN5VEPNTK53SODD5CY"

describe("OTP Class", () => {
  describe("constructor", () => {
    it("secret cannot be undefined", () => {
      expect(() => {
        new OTP()
      }).toThrow(/secret cannot be null/)
    })

    it("passing only secret defaults other values", () => {
      const otp = new OTP(secret)
      expect(otp).toEqual({ secret, ...DEFAULTS })
    })

    it("options get passed down", () => {
      const options = {
        algorithm: "sha256",
        digits: 7,
        period: 31,
        epoch: 5
      }
      const otp = new OTP(secret, options)
      expect(otp).toEqual({ secret, ...options })
    })
  })

  describe("setOptions", () => {
    it("existing properties will not be overriden with defaults", () => {
      const options = {
        algorithm: "sha256",
        digits: 7,
        period: 31,
        epoch: 5
      }

      const otp = new OTP(secret, options)
      expect(otp).toEqual({ secret, ...options })

      otp.setOptions({ algorithm: "sha512" })
      expect(otp).toEqual({ secret, ...options, algorithm: "sha512" })
    })

    it("only allows known algorithms", () => {
      const otp = new OTP(secret)
      expect(() => otp.setOptions({ algorithm: "md512" })).toThrow(
        /is not supported/
      )
    })

    it("only allows positive digits", () => {
      const otp = new OTP(secret)
      expect(() => otp.setOptions({ digits: -1 })).toThrow(
        /digits have to be greater than 0/
      )
    })

    it("only allows positive period", () => {
      const otp = new OTP(secret)
      expect(() => otp.setOptions({ period: -1 })).toThrow(
        /period has to be greater than 0/
      )
    })
  })

  describe("getTickStart()", () => {
    it("returns start date of current tick", () => {
      const epoch = new Date("Mon, 25 Dec 1995 12:00:15 UTC").getTime()
      const tickStart = new Date("Mon, 25 Dec 1995 12:00:00 UTC")
      const otp = new OTP(secret, { epoch })

      expect(otp.getTickStart()).toEqual(tickStart)
    })
  })

  describe("getTickEnd()", () => {
    it("returns end date of current tick", () => {
      const epoch = new Date("Mon, 25 Dec 1995 12:00:15 UTC").getTime()
      const tickEnd = new Date("Mon, 25 Dec 1995 12:00:30 UTC")
      const otp = new OTP(secret, { epoch })

      expect(otp.getTickEnd()).toEqual(tickEnd)
    })
  })

  describe("getTimeUntilNextTick()", () => {
    it("returns seconds to next tick", () => {
      const epoch = new Date("Mon, 25 Dec 1995 12:00:15 UTC").getTime()
      const otp = new OTP(secret, { epoch })
      expect(otp.getTimeUntilNextTick()).toEqual(15)
    })
  })
})
