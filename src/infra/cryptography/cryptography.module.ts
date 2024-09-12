import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { Encrypter } from '@/domain/application/cryptography/encrypter'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'
import { BcryptHasher } from './bcrypt-hasher'
import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { EnvService } from '../env/env.service'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    EnvService,
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
