export class YeastModel {
    Name: string;
    Attenuation: number[];

    constructor({ Name, Attenuation }) {
        this.Name = Name;
        // try to parse the Attentuation array, however it comes back either as [number, number] 
        // or [N/A, N/A] which will fail 
        try {
            this.Attenuation = JSON.parse(Attenuation);
        } catch (e) {
            this.Attenuation = [];
        }
    }
}
