export class UserEntity {
    public id: number;
    public name: string;
    private _partners: UserEntity[] = [];
    private l_amount?: number = 70;
    public parent: UserEntity | null = null;

    constructor(model: any) {
        this.id = model.id || 1;
        this.name = model.name || 'Root';
        this.parent = model.parent || null
    }

    public addPartner(partner: UserEntity) {
        if (this._partners.length < 8) {
            console.log(this._partners.length)
            this._partners.push(partner)
            return this;
        }
        throw new Error('Maximum partners')
    }

    public removePartners() {
        this._partners = [];
    }

    public removePartner() {
        if (this.parent) {
            this.parent._partners = this.parent?._partners.filter((p) => p.id !== this.id)
            return true
        }

        return false
    }

    public removePartnerWithSave() {
        if (this.parent) {
            const partners = [...this._partners];
            this.parent._partners = this.parent?._partners.filter((p) => p.id !== this.id)
            this.parent._partners.push(...partners);
            return true
        }

        return false
    }

    public setVolume(value: number) {
        if (value > 0 && value <= 70) {
            this.l_amount = value;
            return this
        }

        throw new Error('Invalid volume value')
    }

    public get personalVolume() {
        return this.l_amount
    }
    public get groupVolume() {
        return this._partners.reduce((acc, partner) => acc + partner.groupVolume, this.l_amount);
    }

    public get isRoot() {
        return !this.parent
    }

    public get partners() {
        return this._partners
    }

    public get hasPartners() {
        return this._partners.length > 0;
    }

}
