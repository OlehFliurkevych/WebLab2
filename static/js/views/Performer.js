'use strict'

const performerModel = new Performer()

function initAddForm() {
    const form = window.document.querySelector('#performer-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const performerData = {}
        formData.forEach((value, key) => {
            performerData[key] = value
        })
        if (document.getElementById("form-button").innerHTML === "Save") {
            performerModel.Edit(performerData)
        } else {
            performerModel.Create(performerData)
        }

        e.target.reset()
    })
}

function initList() {
    window.jQuery('#performer-list').DataTable({
        data: performerModel.Select(),
        columns: [
            {title: 'ID', data: 'id'},
            {title: 'Name', data: 'name'},
            {title: 'Experience', data: 'experience'},
            {title: 'Count of employees', data: 'count-of-employees'},
            {
                title: 'Edit', data: 'id',
                render: function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<button type="button" onclick="performerModel.startEdit(' + data + ')"> Edit </button>'
                    }
                    return data
                }
            }, {
                title: 'Delete',
                data: 'id',
                render: function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<button type="button" onclick="performerModel.DeleteById(' + row['id'] + ')"> Delete </button>'
                    }
                    return data
                }
            },

        ]
    })
}


function initListEvents() {
    document.addEventListener('performersListDataChanged', function (e) {
        const dataTable = window.jQuery('#performer-list').DataTable()

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
