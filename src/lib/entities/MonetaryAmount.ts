import BaseEntity from "./BaseEntity";

export default class MonetaryAmount extends BaseEntity {
    minorUnits!: number;

    currency!: string;

    constructor(init: Partial<MonetaryAmount>) {
        super(init);
        Object.assign(this, init);
    }
}