window.exampleJsons = [
  {
    "name":"login",
    "fields":[
        {
            "label":"Enter your login or email",
            "input":{
                "type":"text",
                "required":true,
                "placeholder": "login or email"
            }
        },
        {
            "label":"Enter your password",
            "input":{
                "type":"password",
                "required":true,
                "placeholder": "password"
            }
        }
    ],
    "references":[
        {
            "text":"Forgot password?",
            "ref":"rememberpassword"
        },
        {
            "text":"Create new account",
            "ref":"signup"
        }
    ],
    "buttons":[
        {
            "text":"Login"
        }
    ]
},
{
    "name":"register",
    "fields":[
    {
        "input":{
            "type":"text",
            "required":true,
            "placeholder":"Enter full name"
        }
    },
    {
        "input":{
            "type":"email",
            "required":true,
            "placeholder":"Enter email"
        }
    },
    {
        "input":{
            "type":"password",
            "required":true,
            "placeholder":"password"
        }
    },
    {
        "input":{
            "type":"password",
            "required":true,
            "placeholder":"Confirm password"
        }
    }
    ],
    "references":[
        {
            "text without ref":"Already have account?",
            "text":"Login",
            "ref":"signin"
        }
    ],
    "buttons":[
    {
        "text":"Sign Up"
    }
]
},
{
    "name": "addpost",
    "fields": [
    {
        "label":"Title",
        "input": {
            "type":"text",
            "required": true
        }
    },
    {
        "label":"Description",
        "input": {
            "type":"textarea",
            "required":true
        }
    },
    {
        "label":"Image",
        "input": {
            "type":"file",
            "required": true
        }
    },
    {
        "label":"Publish Date",
        "input": {
            "type": "date",
            "required": true
        }
    },
    {
        "label": "Author",
        "input": {
            "type": "text"
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
        "text without ref":"View Author Post",
        "text":"View Author Post",
        "ref":"viewauthor"
    }
  ],
    "buttons":[
    {
        "text":"Create Post"
    }
]
  },
{
    "name":"website_color_scheme",
    "fields":[
        {
            "label":"Choose color scheme",
            "input":{
                "type":"color",
                "colors":["#3366ff","#009933","#990033","#996633"]
            }
        },
        {
            "input":{
                "type":"checkbox",
                "checked":"false"
            },
            "label":"Turn on dark theme?"
        }
    ]
},
{
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
]