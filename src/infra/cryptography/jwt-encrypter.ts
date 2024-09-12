import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Encrypter } from '@/domain/application/cryptography/encrypter'

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    const encrypted = await this.jwtService.signAsync(payload)

    return encrypted
  }

  async verify<T>(token: string): Promise<T> {
    const decoded = await this.jwtService.verifyAsync(token)

    return decoded
  }
}
