class Customer extends BaseModel {
    constructor() {
        super('customers')

        this.fields = this.fields.concat(['name', 'budget'])
    }
}
