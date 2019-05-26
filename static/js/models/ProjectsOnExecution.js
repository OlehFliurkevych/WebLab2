class ProjectsOnExecution extends BaseModel {
    constructor() {
        super('project_on_execution')

        this.fields = this.fields.concat(['project', 'performer', 'date_start', 'date_end'])
    }
}
