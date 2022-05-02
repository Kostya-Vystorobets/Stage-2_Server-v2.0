import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentSevice {
    getAll(): string {
        return 'getAll success!';
    }
    getById(): string {
        return 'getById success!';
    }
    create(): string {
        return 'create success!';
    }
    updeteById(): string {
        return 'updeteById success!';
    }
    deleteById(): string {
        return 'deleteById success!';
    }
}
