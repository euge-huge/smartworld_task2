let formToRender = null;



/* 
    Данный скрипт позволяет динамически парсить JSON формат
    и на его основе отриовывать на странице форму.

    Для удобства вынесены все функции, которые так или иначе работают с разметкой,
    чтобы их было удобнее видоизменять
*/




$(document).ready(() => {
    const inputFile = document.getElementById("file");
    const generateBtn = document.getElementById("generate");
    const clearBtn = document.getElementById("clear");
    const content = document.getElementById("content");

    let input = document.getElementById( 'file' );
    let label    = input.nextElementSibling,
    labelVal = label.innerHTML;
    input.addEventListener( 'change', function( e )
    {
        let fileName = '';
        if( this.files && this.files.length > 1 )
            fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
        else
            fileName = e.target.value.split( '\\' ).pop();
    
        if( fileName )
            label.querySelector( 'span' ).innerHTML = fileName;
        else
            label.innerHTML = labelVal;

            const [file] = event.target.files;

            if (file.type !== "text/javascript") {
                formToRender = null;
                return content.innerHTML = createErrorMsg("Вы загрузили не JSON файл. Попробуйте заново!")
            }
    
            let reader = new FileReader();
    
    
            reader.onload = (function(theFile) {
                return function(event) {
                    formToRender = JSON.parse(event.target.result);
                }
            })(file)
    
            reader.readAsText(file)
    });

    // Для выбора существующих файлов
    const exists = document.getElementById('exists-json')
    const exampleJsons = window.exampleJsons
    const select = createSelect(exampleJsons);
    exists.innerHTML = select
    const selectExample = document.getElementById("selectExample")
    const exampleBtn = document.getElementById("example-btn");
    

    exampleBtn.addEventListener('click', ()=> {
        const idx = selectExample.selectedIndex
        renderForm(exampleJsons[idx])
    })


    // Обработчик событи при загрузке файла
    inputFile.addEventListener("change", (event) => {
        const [file] = event.target.files;
        if (file.type !== "text/javascript") {
            return content.innerHTML = createErrorMsg("Вы загрузили не JSON файл. Попробуйте заново!")
        }

        let reader = new FileReader();


        reader.onload = (function(theFile) {
            return function(event) {
                formToRender = JSON.parse(event.target.result);
            }
        })(file)

        reader.readAsText(file)
    
    })

    // Обработчик события при нажатия на кнопку генерации
    generateBtn.addEventListener("click", () => {
        renderForm(formToRender)
    })

    // Обработчик событий при нажатии на кнопку отчистить
    clearBtn.addEventListener("click", () => {
        content.innerHTML = createClearMsg();
    })

})

const renderForm = (formToRender) => {
    let form = ``;
        let formHeader = ``
        let formFields = ``;
        let formRefs = ``;
        let formBtns = ``;
        let error = ``;

        if (!formToRender) {
            return content.innerHTML = createErrorMsg("Не найден файл для рендеринга! Выберите JSON файл в форме выше!")
        }


        // Пробегаем все ключи формы и передаем их в соответствующие функции, результат заносим в переменные
        Object.keys(formToRender).map(key => {
            switch (key) {
                case "name":
                    formHeader = createHeader(formToRender[key]);
                    break;
                case "fields":
                    formFields = createFields(formToRender[key]);
                    break;
                case "references":
                    formRefs = createRef(formToRender[key]);
                    break;
                case "buttons":
                    formBtns = createButtons(formToRender[key]);
                    break;
                default:
                    error = createErrorMsg("Извините, во время рендеринга что-то пошло не так. Проверьте файл и попробуйте снова.");
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


        // Добавляем маски там где это нужно
        $(".form-control[mask]").each(function() {
            $(this).mask($(this).attr('mask'))
        });

        // Обрабатываем поля с множественным выбором, в случае недопустимого формата блокируем кнопки
        $(".form-control-file").each(function() {
            $(this).on('change', (e) => {
                let error = false
                let extensions = $(this).attr('filetype').split(',');
                Object.keys(e.target.files).map(item => {
                    let type = e.target.files[item].type.split('/').pop();
                    if (extensions.indexOf(type) < 0) {
                        alert("Выберите файл с допустимым расширением: " + extensions)
                        error = true;
                    }
                })
                if (error) {
                    $(this).files = null;

                    $(".form-btns").children().each(function() {
                        $(this).attr('disabled', true);
                    }) 
                } else {
                    $(".form-btns").children().each(function() {
                        $(this).attr('disabled', false);
                    }) 
                }
            })
            
        });
}

const createSelect = (options) => {
    let optionToAdd = ``;
    options.map(item => {
        optionToAdd += `<option value="${item.name}" >${item.name}</option>`
    })

    return `
    <div class="example-input input-group">
    <div class="input-group-prepend">
      <button id="example-btn" class="btn btn-outline-info" type="button">Построить пример</button>
    </div>
    <select class="custom-select" id="selectExample" aria-label="Example select with button addon">
    ${optionToAdd}
    </select>
    </div>
    ` 
    
}


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
        ${input.type == 'textarea' ? '<textarea ' : '<input '} 
            id="${id}" 
            class="${input.type === "file" 
                ? "form-control-file" 
                    : input.type === "checkbox" 
                        ? "checkbox-input" 
                            : "form-control"}"
            ${parsedInputFields}
            ${input.type == 'textarea' ? ' > </textarea>' : ' > '} 
    </div>
    `
}

// Метод парсит все поля инпута
const parseInput = (input) => {
    let inputToAdd = ``;
    let inputToParse = input;
    if (inputToParse.mask) {
        inputToParse.type = "text"
    }
    Object.keys(inputToParse).map(item => {
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
        <div class="alert alert-primary" role="alert">
            Форма очищена, построите ее заново или выберите другую?
        </div>
    `
}

// Генерирует красный алерт ошибки 
const createErrorMsg = (msg) => {
    return `
        <div class="alert alert-danger" role="alert">
            ${msg}
        </div>
    `
}

