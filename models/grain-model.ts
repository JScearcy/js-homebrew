export class GrainModel {
    id: number;
    lovi: number;
    flavor: string;
    name: string;
    PPG: number;

    constructor({ id, lovi, flavor, name, PPG }) {
        this.id = id;
        this.lovi = lovi;
        this.flavor = flavor;
        this.name = name;
        this.PPG = PPG;
    }
}
