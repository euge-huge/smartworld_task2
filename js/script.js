const signin = {
    "name":"interview",
    "fields":[
        {
            "label":"Введите своё ФИО",
            "input":{
                "type":"text",
                "required":true,
                "placeholder":"Иванов Иван Иванович"
            }
        },
        {
          "label":"Введите Номер телефона",
          "input":{
              "type":"number",
              "required":true,
              "mask": "+7 (999) 99-99-999"
          }
        },
        {
          "label":"Введите свою Почту",
          "input":{
              "type":"email",
              "required":true,
              "placeholder":"example@mail.com"
          }
        },
        {
            "label":"Введите свой возраст",
            "input":{
                "type":"number",
                "required":true
            }
        },
        {
            "label":"Введите вашу специальность",
            "input":{
                "type":"text",
                "required":true
            }
        },
        {
            "label":"Выберете технологии, с которыми вы работали",
            "input":{
                "type":"technology",
                "required": true,
                "technologies": ["PHP", "JS", "Laravel", "Express.js", "Yii2", "HTML", "CSS", "Java"],
                "multiple": true
            }
        },
        {
            "label":"Ваш срок работы",
            "input":{
                "type":"number",
                "required": true
            }
        },
        {
            "label":"Ваша фотография",
            "input":{
                "type":"file",
                "required":true
            }
        },
        {
            "label":"Серия, номер",
            "input":{
                "type": "number",
                "required": true,
                "mask": "99-99 999999"
            }
        },
        {
            "label":"Код подразделения",
            "input":{
                "type": "number",
                "required": true,
                "mask": "999-999"
            }
        },
        {
            "label":"Скан / Фото паспорта (1 страница)",
            "input":{
                "type": "file",
                "required": true,
                "multiple": true,
                "filetype": ["png", "jpeg", "pdf"]
            }
        },
        {
            "label":"Расскажите немного о себе",
            "input":{
                "type":"textarea",
                "required:":true
            }
        }
    ],
    "references":[
        {
          "input":{
            "type":"checkbox",
            "required":true,
            "checked":"false"
          }
        },
        {
            "text without ref":"I accept the",
            "text":"Terms & Conditions",
            "ref":"termsandconditions"
        }
    ],
    "buttons":[
        {
            "text":"Send"
        },
        {
            "text":"Cancel"
        }
    ]
}


/* 
    Данный скрипт позволяет динамически парсить JSON формат
    и на его основе отриовывать на странице форму.

    Для удобства вынесены все функции, которые так или иначе работают с разметкой,
    чтобы их было удобнее видоизменять
*/



$(document).ready(() => {
    const inputFile = document.getElementById("inputFile");
    const generateBtn = document.getElementById("generate");
    const clearBtn = document.getElementById("clear");
    const content = document.getElementById("content");


    // Обработчик события при нажатия на кнопку генерации
    generateBtn.addEventListener("click", (event, json = signin) => {
        let form = ``;
        let formHeader = ``
        let formFields = ``;
        let formRefs = ``;
        let formBtns = ``;
        let error = ``;


        // Пробегаем все ключи формы и передаем их в соответствующие функции, результат заносим в переменные
        Object.keys(signin).map(key => {
            switch (key) {
                case "name":
                    formHeader = createHeader(signin[key]);
                    break;
                case "fields":
                    formFields = createFields(signin[key]);
                    break;
                case "references":
                    formRefs = createRef(signin[key]);
                    break;
                case "buttons":
                    formBtns = createButtons(signin[key]);
                    break;
                default:
                    error = createErrorRendering();
                    break;
            }
        })

        // Если есть ошибка прекращаем проход
        if (error) {
            content.innerHTML = error
            error = ``;
            return;
        }

        // Собираем форму
        form = createForm(formFields, formRefs, formBtns)

        // Добавляем в разметку готовую форму
        content.innerHTML = formHeader + form;
    })

    // Обработчик событий при нажатии на кнопку отчистить
    clearBtn.addEventListener("click", () => {
        content.innerHTML = createClearMsg();
    })

})

// Метод возвращает разметку название формы
const createHeader = (header) => {
    return `
    <h2 class="form-header">${header}</h2>
    `
}

// Метод создает все поля формы и добавляет их в одну переменную
const createFields = (fields) => {
    let fieldsToAdd = ``;
    fields.map(item => {
        if (item.input) {
            fieldsToAdd += createInputGroup(item.label, item.input)
        }
    })
    return fieldsToAdd;
}

// Метод создает каждый input в отдельности
const createInputGroup = (label, input) => {
    // WARNING: Я не уверен в правильности слудующей строки, но не придумал ничего лучше =)
    let id = Math.floor(Math.random() * 10000)
    let parsedInputFields = parseInput(input);
    return `
    <div class="form-group ${input.type === 'checkbox' ? 'form-check' : ""} ">
        ${label ? `<label for="${id}">${label}</label>` : ''}
        <input 
            id="${id}" 
            class="${input.type === "file" 
                ? "form-control-file" 
                    : input.type === "checkbox" 
                        ? "checkbox-input" 
                            : "form-control"}"
            ${parsedInputFields}
        >
    </div>
    `
}

// Метод парсит все поля инпута
const parseInput = (input) => {
    let inputToAdd = ``;
    Object.keys(input).map(item => {
        inputToAdd += ` ${item}="${String(input[item])}"`
        console.log();
    })
    return inputToAdd;
}

// Метод создает ссылки формы
const createRef = (ref) => {
    let refsToAdd = ``;

    ref.map(item => {
        if (item.input) {
            refsToAdd += `
            <input class="" type="${item.input.type}" required="${item.input.required}" placeholder="${item.input.placeholder ? item.input.placeholder : ""} ">
            `
        } else {
            let newRef = `
            <span class="ref">
                ${item["text without ref"] ? item["text without ref"] : ""} <a href="${item.ref}">${item.text}</a>
            </span>
          `
          refsToAdd += newRef;
        }
    })

    refsToAdd = `
        <div class="form-refs">
            ${refsToAdd}
        </div>
    `

    return refsToAdd;
}

// Метод создает блок кнопок
const createButtons = (buttons) => {
    let buttonsToAdd = ``;
    buttons.map(item => {
        buttonsToAdd += createButton(item);
    })

    buttonsToAdd = `<div class="form-btns btn-group">${buttonsToAdd}</div>`

    return buttonsToAdd;
}

// Метод создает отдельную кнопку
const createButton = (button) => {
    return `
    <button class="btn btn-primary">${button.text}</button>
    `;
}


// Метод, который собирает всю форму в единую
const createForm = (fields, refs, btns) => {
    return `
        <form action="#" class="form card">
            ${fields}
            ${refs}
            ${btns}
        </form>
    `
}

// Сообщение, появляется при очистке
const createClearMsg = () => {
    return `
        <div class="form-cleared alert alert-primary" role="alert">
            Форма очищена, построите ее заново или выберите другую?
        </div>
    `
}

const createErrorRendering = () => {
    return `
        <div class="form-error alert alert-danger" role="alert">
            Извините, во время рендеринга что-то пошло не так. Проверьте файл и попробуйте снова.
        </div>
    `
}

