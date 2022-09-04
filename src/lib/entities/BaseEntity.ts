import { Guid } from 'guid-typescript';

export default abstract class BaseEntity {
    id = Guid.create().toString();

    constructor(init: Partial<BaseEntity>) {
        Object.assign(this, init);
    }
}