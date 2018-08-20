let data = [
    {'name': 'Александра', 'phone': '+79097589000'},
    {'name': 'Анатолий', 'phone': '89764958234'},
    {'name': 'Наталья', 'phone': '+79167259229'},
    {'name': 'Сергей', 'phone': '+79058459235'}  
];
const buttons = [
    {'class': 'edit', 'text': 'Редактировать'},
    {'class': 'delete', 'text': 'Стереть'},
    {'class': 'edit', 'text': 'Сохранить'}
];

const form = document.querySelector('#form');
const addName = document.querySelector('#add-name');
const addPhone = document.querySelector('#add-phone');
const app = document.querySelector('#app');
const users = document.querySelector('#users');
const user = document.querySelectorAll('.user');
const table = document.querySelector('table');

const re = /^[\+]?([\d][\-]?)+[\d]+$/;

function createButton(obj){
    const td = document.createElement('td');
    const button = document.createElement('button');
    button.className = obj['class'];
    button.innerText = obj['text'];
    td.appendChild(button);
    return td;
}

function createTable(arr){
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.innerText = 'Пользователи';
    const thead = document.createElement('thead');
    thead.innerHTML = '<th>Имя</th><th>Телефон</th><th></th><th></th>';
    const tbody = document.createElement('tbody');
    arr.forEach((item,i) => {
        const tr = document.createElement('tr');
        Object.keys(item).forEach((key) => {
            const td = document.createElement('td');
            const label = document.createElement('label');
            label.className = key;
            label.innerText = item[key];
            const input = document.createElement('input');
            input.className = 'textfield-' + key;
            input.type = 'text';
            td.appendChild(label);
            td.appendChild(input);
            tr.appendChild(td);
        });//['name', 'phone']
        tr.appendChild(createButton(buttons[0]));
        tr.appendChild(createButton(buttons[1]));
        bindEvents(tr, i);
        tbody.appendChild(tr);
    });
    table.appendChild(caption);
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

const tableElement = createTable(data);
app.appendChild(tableElement);

function bindEvents(user, id){
    const editButton = user.querySelector('button.edit');
    const deleteButton = user.querySelector('button.delete');

    editButton.addEventListener('click', () => {editUser(id)});
    deleteButton.addEventListener('click', () => {deleteUser(id)});
}

function deleteUser(id){
    data = data.filter((item,i) => i != id);
    app.innerHTML = '';
    app.appendChild(createTable(data));
}

function editUser(id){
    const user = data.filter((item,i) => i == id)[0];
    const tbody = document.querySelector('tbody');
    const tr = tbody.querySelectorAll('tr')[id];
    const editButton = tr.querySelector('.edit');

    if(editButton.innerText === 'Редактировать') {

        Object.keys(user).forEach((key) => {
            const label = tr.querySelector('.'+key);
            label.className = key + ' save';
            const input = tr.querySelector('.textfield-' + key);
            input.className = 'textfield-' + key + ' save';
            input.value = user[key];
        });
        
        editButton.innerText = 'Сохранить';
    }
    else {

        const labelName = tr.querySelector('.name');
        const inputName = tr.querySelector('.textfield-name');
        const labelPhone = tr.querySelector('.phone');
        const inputPhone = tr.querySelector('.textfield-phone');
        if(inputName.value === '') {
            return alert('Заполните все поля');
        }
 
        if((inputPhone.value === '') || (!re.test(inputPhone.value))) {
            return alert('Неправильный формат телефона');
        }
        labelName.innerText = inputName.value;
        labelName.className = 'name';
        inputName.className = 'textfield-name';
        data[id]['name'] = inputName.value;
        labelPhone.className = 'phone';
        labelPhone.innerText = inputPhone.value;
        inputPhone.className = 'textfield-phone';
        data[id]['phone'] = inputPhone.value;
        editButton.innerText = 'Редактировать'; 
    } 
}

function updateTable(name, phone){
    let obj = {'name': name, 'phone': phone};
    data.push(obj);
    return createTable(data);
}

function addUser(event){
    event.preventDefault();

    if(addName.value ==='' || addPhone.value ==='') {
        return alert('Заполните все поля');
    } else if(!re.test(addPhone.value)) {
        return alert('Неправильный формат телефона');
    }

    const listUser = updateTable(addName.value, addPhone.value);
    app.innerHTML = '';
    app.appendChild(listUser);
    addName.value = '';
    addPhone.value = '';
}

user.forEach(item => bindEvents(item));
form.addEventListener('submit', addUser);
