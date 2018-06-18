
export class HopModel {
    id: number;
    Name: string;
    Origin: string;
    Type: string;
    Alpha_Acid: number;
    Beta_Acid: number;
    Notes: string;

    constructor({ id, Name, Origin, Type, Alpha_Acid, Beta_Acid, Notes }) {
        this.id = id;
        this.Name = Name;
        this.Origin = Origin;
        this.Type = Type;
        this.Alpha_Acid = Alpha_Acid;
        this.Beta_Acid = Beta_Acid;
        this.Notes = Notes;
    }
}
