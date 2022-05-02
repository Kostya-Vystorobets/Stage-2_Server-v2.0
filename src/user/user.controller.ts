import { Controller, Get, Post } from '@nestjs/common';
import { UserSevice } from './user.service';

@Controller('/api/v2/user')
export class UserControler {
    constructor(private readonly userServise: UserSevice) { }

    @Post()
    login(): string {
        return this.userServise.login();
    }
    create(): string {
        return this.userServise.create();
    }
}
