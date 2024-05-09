import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { TokenPayload, tokenPayload } from '@/infra/http/schemas/token-schema'
import { EnvService } from '../env/env.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const publicKey = env.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithm: ['RS256'],
    })
  }

  async validate(payload: TokenPayload) {
    return tokenPayload.parse(payload)
  }
}
