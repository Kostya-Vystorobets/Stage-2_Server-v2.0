import { UserSevice } from './user.service';
import { UserControler } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [UserControler],
    providers: [UserSevice]
})
export class UserModule { }
