class ProjectsOnExecution extends BaseModel {
    constructor() {
        super('projects_on_execution')

        this.fields = this.fields.concat(['project', 'performer', 'date_start', 'date_end'])
    }
}
