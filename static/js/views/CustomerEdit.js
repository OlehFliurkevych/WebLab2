'use strict'

const customerModel = new Customer()


function initEditForm () {
    const shop_id = parseInt(window.document.querySelector('#id').innerHTML)
    var customer = customerModel.FindById(shop_id);
    var name = document.getElementById("name").value = customer.name
    var budget = document.getElementById("budget").value = customer.budget
    const form = window.document.querySelector('#customer-edit-form')
    form.addEventListener('submit', function (e) {
        var all_customers = JSON.parse(localStorage.getItem('customers'))
        for (let index = 0; index < all_customers.length; index++) {

            if (customerModel[index].id === shop_id){
                customerModel[index].name = document.getElementById("name").value
                customerModel[index].budget = document.getElementById("budget").value
            }
        };

        localStorage.setItem("customers", JSON.stringify(all_customers));
    })

}



window.addEventListener('DOMContentLoaded', e => {
    initEditForm()

})
