import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'
import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'
import { EnvService } from '../env/env.service'

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  constructor(private envService: EnvService) {}

  async hash(plain: string): Promise<string> {
    const salt = this.envService.get('HASH_SALT')

    return hash(plain, salt)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
