import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default (configService: ConfigService): JwtModuleOptions => ({
  global: true,
  secret: configService.get('JWT_KEY'),
  signOptions: {
    expiresIn: '60s',
  },
});
