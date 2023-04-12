export class UserEntity {
    public root: boolean;
    public id: string | number;
    public firstName: string;
    public lastName: string;
    public groupVolume: number;
    public groupVolumeProgressBar: number;
    public countOfChildren: number;
    public countOfFirstLine: string;
    public l_amount: number;
    public list: any[];
    public deepLvl: number;
    public tooltip: {isOpen: boolean; removing: string; info: string};

    constructor(id, root = true) {
        this.root = root;
        this.id = `Vasya-${id}`;
        this.firstName = "Vasya";
        this.lastName = "Pupkin";
        this.groupVolume = 0;
        this.groupVolumeProgressBar = 0;
        this.countOfChildren = 8;
        this.countOfFirstLine = "0";
        this.l_amount = 70;
        this.list = [];
        this.deepLvl = 1;
        this.tooltip = {
            isOpen: false,
            info: 'TooltipInfo',
            removing: 'TooltipRemove'
        }
    }
}
