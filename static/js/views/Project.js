'use strict'

const projectModel = new Project()

function initAddForm() {
    const form = window.document.querySelector('#project-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const projectData = {}
        formData.forEach((value, key) => {
            projectData[key] = value
        })
        if (document.getElementById("form-button").innerHTML === "Save") {
            projectModel.Edit(projectData)
        } else {
            projectModel.Create(projectData)
        }

        e.target.reset()
    })
}

function initList() {
    window.jQuery('#project-list').DataTable({
        data: projectModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Title', data: 'title' },
            { title: 'Description', data: 'description' },
            { title: 'Customer', data: 'customer' },
            {
                title: 'Edit', data: 'id',
                render: function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<button type="button" onclick="projectModel.startEdit(' + data + ')"> Edit </button>'
                    }
                    return data
                }
            }, {
                title: 'Delete',
                data: 'id',
                render: function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<button type="button" onclick="projectModel.DeleteById(' + row['id'] + ')"> Delete </button>'
                    }
                    return data
                }
            },

        ]
    })
}


function initListEvents() {
    document.addEventListener('projectsListDataChanged', function (e) {
        const dataTable = window.jQuery('#project-list').DataTable()

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
if (localStorage.getItem("customers")) {
    JSON.parse(localStorage.getItem("customers")).forEach(function (item) {
        source.push(item["name"])
    });
}
$("#customer").autocomplete({
    source: source
});
