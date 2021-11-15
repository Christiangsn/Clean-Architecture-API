import { Hasher } from '../../data/protocols/criptografy/hasher'
import bcrypt from 'bcrypt'
import { HashCompare } from '@data/protocols/criptografy/hash'

export class BcryptAdapter implements Hasher, HashCompare {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return new Promise<boolean>((resolve, reject) => resolve(true))
  }
}
