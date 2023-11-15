const lists = document.querySelector('.lists');
const selectedList = document.querySelector('.selectedList');
const todoListElement = document.querySelector('.todoList');
const todoFormElement = document.querySelector('#TodoForm');
const todoInputElement = document.querySelector('[name="Todo"]');
const todoContainer = document.querySelector('.todoContainer');

const createTodoListHtml = (todo) => {
    if (todo.trim() === "") {
        return null;
    }
    const todoItem = document.createElement('li');
    const todoRemoveBtn = document.createElement('button'); 
    todoRemoveBtn.innerText = 'Sil';
    todoRemoveBtn.classList.add('todoRemoveBtn');

    const label = document.createElement('label');
    label.innerText = todo;

    const changeInput = document.createElement('input');
    changeInput.type = 'text';
    changeInput.value = todo;

    changeInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            this.previousSibling.innerText = this.value;
            this.parentElement.classList.remove('onEdit');
        }
    });

    todoRemoveBtn.addEventListener('click', function () {
        this.parentElement.remove();
    });

    todoItem.innerHTML = `<input type="checkbox">`;
    todoItem.appendChild(label);
    todoItem.appendChild(changeInput);
    todoItem.appendChild(todoRemoveBtn);
    return todoItem;
};

todoFormElement.addEventListener('submit', function (e) {
    e.preventDefault();
    const todoListItem = createTodoListHtml(todoInputElement.value);
    if (todoListItem) {
        todoListElement.appendChild(todoListItem);
        todoInputElement.value = '';
        bindBtnClickEvents();
    }
});

function bindBtnClickEvents() {
    const removeBtns = document.querySelectorAll('.todoRemoveBtn');
    removeBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            this.parentElement.remove();
        });
    });

    const labels = document.querySelectorAll('.todoList li label');
    labels.forEach((label) => {
        label.addEventListener('dblclick', function () {
            const detailPanel = createDetailPanel(this.innerText);
            todoContainer.innerHTML = '';
            todoContainer.appendChild(detailPanel);
        });
    });
}

function createDetailPanel(todo) {
    const detailPanel = document.createElement('div');
    detailPanel.classList.add('detailPanel');

    const todoContainerTitle = document.createElement('div');
    todoContainerTitle.classList.add('todoContainerTitle');

    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = todo;

    // Checkbox durumunu todo başlığı ile senkronize etmek için event listener ekle
    todoCheckbox.addEventListener('change', function () {
        todoTitle.classList.toggle('completed', this.checked);
    });

    const userNameDiv = document.createElement('div');
    userNameDiv.classList.add('userNameDiv');
    const userNameLabel = document.createElement('label');
    userNameLabel.innerText = 'Kullanıcı Adı:';
    const userNameInput = document.createElement('input');
    userNameInput.type = 'text';

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('dateDiv');
    const dateLabel = document.createElement('label');
    dateLabel.innerText = 'Tarih:';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('timeDiv');
    const timeLabel = document.createElement('label');
    timeLabel.innerText = 'Zaman:';
    const timeInput = document.createElement('input');
    timeInput.type = 'time';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('descriptionDiv');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.innerText = 'Açıklama:';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = 'Açıklama girin...';

    const saveButton = document.createElement('button');
    saveButton.classList.add('saveButton');
    saveButton.innerText = 'Kaydet';
    saveButton.addEventListener('click', function () {
        const todoItem = {
            title: todoTitle.innerText,
            userName: userNameInput.value,
            date: dateInput.value,
            time: timeInput.value,
            description: descriptionInput.value
        };

        // Todo verilerini kaydetmek için gerekli işlemleri burada gerçekleştirin

        // Paneli temizle
        todoContainer.innerHTML = '';
        detailPanel.appendChild(createSuccessMessage());
    });

    todoContainerTitle.appendChild(todoCheckbox);
    todoContainerTitle.appendChild(todoTitle);

    userNameDiv.appendChild(userNameLabel);
    userNameDiv.appendChild(userNameInput);

    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dateInput);

    timeDiv.appendChild(timeLabel);
    timeDiv.appendChild(timeInput);

    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(descriptionInput);

    detailPanel.appendChild(todoContainerTitle);
    detailPanel.appendChild(createLine());
    detailPanel.appendChild(userNameDiv);
    detailPanel.appendChild(createLine());
    detailPanel.appendChild(dateDiv);
    detailPanel.appendChild(createLine());
    detailPanel.appendChild(timeDiv);
    detailPanel.appendChild(createLine());
    detailPanel.appendChild(descriptionDiv);
    detailPanel.appendChild(saveButton);

    return detailPanel;
}

function createLine() {
    const line = document.createElement('hr');
    return line;
}

function createSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.innerText = 'Kaydedildi!';
    return successMessage;
}

bindBtnClickEvents();

