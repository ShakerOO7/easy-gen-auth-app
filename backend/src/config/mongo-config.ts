import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export default (configService: ConfigService): MongooseModuleOptions => ({
  uri: configService.get('MONGODB_URL'),
});
