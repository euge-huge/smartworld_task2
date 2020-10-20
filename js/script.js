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
*/



$(document).ready(() => {
    const inputFile = document.getElementById("inputFile");
    const generateBtn = document.getElementById("generate");
    const clearBtn = document.getElementById("clear");
    const content = document.getElementById("servey");


generateBtn.addEventListener("click", (event, json = signin) => {
    let contentToShow = ``;
    let serveyForm = ``;
    let serveyHeader = ``
    let serveyFormFields = ``;
    let serveyReferences = ``;
    let serveyButtons = ``;


    Object.keys(signin).map(key => {
        switch (key) {
            case "name":
                serveyHeader = createHeader(signin[key]);
                break;
            case "fields":
                serveyFormFields = createFields(signin[key]);
                break;
            case "references":
                serveyReferences = createRef(signin[key]);
                break;
            case "buttons":
                serveyButtons = createButtons(signin[key]);
                break;
            default:
                contentToShow = `ERROR`;
                break;
        }
        if (typeof signin[key] === "object") {
             //signin[key].map(item => console.log(item))
        }
    })

    serveyForm = `
    <form action="#">
    ${serveyFormFields}
    ${serveyReferences}
    ${serveyButtons}
    </form>
    `

    content.innerHTML = serveyHeader + serveyForm;
})

clearBtn.addEventListener("click", () => {
    content.innerHTML = ``
})

})




const createFields = (fields) => {
    let fieldsToAdd = ``;
    fields.map(item => {
        if (item.input) {
            fieldsToAdd += createInputGroup(item.label, item.input)
        }
    })
    return fieldsToAdd;
}

const createRef = (ref) => {
    let refsToAdd = ``;

    ref.map(item => {
        if (item.input) {
            refsToAdd += createInputGroup("", item.input)
        } else {
            let newRef = `
            <span class="ref">
                ${item["text without ref"] ? item["text without ref"] : null} <a href="${item.ref}">${item.text}</a>
            </span>
          `
          refsToAdd += newRef;
        }
    })

    return refsToAdd;
}

const createButtons = (buttons) => {
    let buttonsToAdd = ``;
    buttons.map(item => {
        buttonsToAdd += createButton(item);
    })

    buttonsToAdd = `<div>${buttonsToAdd}</div>`

    return buttonsToAdd;
}

const createHeader = (header) => {
    return `
    <h2 class="text-center text-uppercase">${header}</h2>
    `
}

const createInputGroup = (label, input) => {
    let id = Math.floor(Math.random() * 10000)
    return `
    <div class="form-group">
        <label for="${id}">${label}</label>
        <input id="${id}" class="form-control" type="${input.type}" required="${input.required}" placeholder="${input.placeholder ? input.placeholder : ""} ">
    </div>
    `
}

const createButton = (button) => {
    return `
    <button class="btn btn-default">${button.text}</button>
    `;
}

