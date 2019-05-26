'use strict'

const customerModel = new Customer()

function initAddForm() {
    const form = window.document.querySelector('#customer-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const customerData = {}
        formData.forEach((value, key) => {
            customerData[key] = value
        })
        if (document.getElementById("form-button").innerHTML === "Save") {
            customerModel.Edit(customerData)
        } else {
            customerModel.Create(customerData)
        }

        e.target.reset()
    })
}

function initList() {
    window.jQuery('#customer-list').DataTable({
        data: customerModel.Select(),
        columns: [
            {title: 'ID', data: 'id'},
            {title: 'Name', data: 'name'},
            {title: 'Budget', data: 'budget'},
            {
                title: 'Edit', data: 'id',
                render: function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<button type="button" onclick="customerModel.startEdit(' + data + ')"> Edit </button>'
                    }
                    return data
                }
            }, {
                title: 'Delete',
                data: 'id',
                render: function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<button type="button" onclick="customerModel.DeleteById(' + row['id'] + ')"> Delete </button>'
                    }
                    return data
                }
            },

        ]
    })
}


function initListEvents() {
    document.addEventListener('customersListDataChanged', function (e) {
        const dataTable = window.jQuery('#customer-list').DataTable()

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
