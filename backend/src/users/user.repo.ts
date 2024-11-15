import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

/**
 * UserRepo a seperate class for the DB logic
 */
@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(dto: CreateUserDto) {
    return new this.userModel(dto);
  }

  createAndSave(dto: CreateUserDto) {
    const user = this.create(dto);
    this.logger.log(`Created the user ${dto.email}`);
    return user.save();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async exists(email: string) {
    const exists = await this.userModel.exists({ email });
    return exists ? true : false;
  }
}
