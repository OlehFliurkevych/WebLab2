class Performer extends BaseModel {
    constructor() {
        super('performers')

        this.fields = this.fields.concat(['name', 'experience', 'count-of-employees'])
    }
}
