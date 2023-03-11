async function submitdetails(event) {
    event.preventDefault()

    const sprice = event.target.sprice.value
    const pname = event.target.pname.value
    const category = document.getElementById("select").value

    const obj = {
        sprice,
        pname,
        category,
    }

    try {
        const response = await axios.post("https://crudcrud.com/api/cbb0aabf2a6b44c8826aed4641913d0a/admindata", obj)
        showuseronscreen(response.data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}


window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("https://crudcrud.com/api/cbb0aabf2a6b44c8826aed4641913d0a/admindata")
        for (let i = 0; i < response.data.length; i++) {
            showuseronscreen(response.data[i])
        }
    } catch (error) {
        console.log(error)
    }
})

async function deleteProduct(obj, parentelem, childelem) {
    try {
        const response = await axios.delete(`https://crudcrud.com/api/cbb0aabf2a6b44c8826aed4641913d0a/admindata/${obj._id}`)
        parentelem.removeChild(childelem)
    } catch (error) {
        console.log(error)
    }
}

function showuseronscreen(obj) {
    let parentelem = document.getElementById(obj.category + "list")
    if (!parentelem) {
        parentelem = document.createElement('li')
        parentelem.id = obj.category + "list"
        document.body.appendChild(parentelem)
    }

    let childelem = document.createElement("li")
    childelem.textContent = obj.sprice + " - " + obj.pname + " - " + obj.category + " "

    let del = document.createElement("input")
    del.type = "button"
    del.value = "Delete Product"

    del.onclick = function() {
        deleteProduct(obj, parentelem, childelem)
    };

    childelem.appendChild(del)
    parentelem.appendChild(childelem)
}