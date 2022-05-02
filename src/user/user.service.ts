import { create } from 'domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSevice {
    login(): string {
        return 'login success!';
    }
    create(): string {
        return 'create success!';
    }
}
