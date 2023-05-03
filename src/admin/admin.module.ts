import { Module, forwardRef } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../../schemas/admin.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CreateAdminDTO', schema: AdminSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
