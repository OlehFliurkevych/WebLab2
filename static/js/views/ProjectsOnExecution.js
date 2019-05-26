'use strict'

const projectsOnExecutionModel = new ProjectsOnExecution()

function initAddForm () {
    const form = window.document.querySelector('#projectsonexecution-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const projectsOnExecutionData = {}
        formData.forEach((value, key) => {
            projectsOnExecutionData[key] = value
        })
        if (document.getElementById("form-button").innerHTML === "Save") {
            projectsOnExecutionModel.Edit(projectsOnExecutionData)
        } else {
            projectsOnExecutionModel.Create(projectsOnExecutionData)
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#projectsonexecution-list').DataTable({
        data: projectsOnExecutionModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Project', data: 'project'},
            { title: 'Performer', data: 'performer'},
            { title: 'Date start', data: 'date_start'},
            { title: 'Date end', data: 'date_end'},
            { title: 'Edit', data: 'id',
                render: function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<button type="button" onclick="projectsOnExecutionModel.startEdit(' + data + ')"> Edit </button>'
                    }
                    return data
                }
            },{
                title: 'Delete',
                data: 'id',
                render: function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<button type="button" onclick="projectsOnExecutionModel.DeleteById(' + row['id'] + ')"> Delete </button>'
                    }
                    return data
                }
            },

        ]
    })
}



function initListEvents () {
    document.addEventListener('projects_on_executionListDataChanged', function (e) {
        const dataTable = window.jQuery('#productsonstorage-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}


window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})

let source = []
if (localStorage.getItem("projects")) {
    JSON.parse(localStorage.getItem("projects")).forEach(function (item) {
        source.push(item["title"])
    });
}
$("#project").autocomplete({
    source: source
});

let source1 = []
if (localStorage.getItem("performers")) {
    JSON.parse(localStorage.getItem("performers")).forEach(function (item) {
        source1.push(item["name"])
    });
}
$("#performer").autocomplete({
    source: source1
});
