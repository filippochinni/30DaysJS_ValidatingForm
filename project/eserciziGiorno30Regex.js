/* DEFINIZIONE DI ELEMENTI RUNTIME */

const firstNamePlaceholder = `Insert First Name...`;
const lastNamePlaceholder = `Insert Last Name...`;
const emailPlaceholder = `Insert Email...`;
const passwordPlaceholder = `Insert Password...`;
const telephonePlaceholder = `Insert Telephone...`;
const yourBioPlaceholder = `Insert Bio...`;

const firstNameFeedback = `First Name must be alphanumeric and contain 4-16 characters`;
const lastNameFeedback = `Last Name must be alphanumeric and contain 4-16 characters`;
const emailFeedback = `Email must be a valid address, e.g. example@example.com`;
const passwordFeedback = `Password must be alphanumeric (@, _ and - are also allowed) and between 4-20 characters`;
const telephoneFeedback = `A valid Telephone number (11 digits and 333-333-3334)`;
const yourBioFeedback = `Bio must contain only lowercase letters, underscores, hyphens and be 4-50 characters`;

const formFields = {
    "First Name": {
        regex: /^[a-zA-Z0-9]{4,16}$/,
        placeholder: firstNamePlaceholder,
        feedback: firstNameFeedback
    },
    "Last Name": {
        regex: /^[a-zA-Z0-9]{4,16}$/,
        placeholder: lastNamePlaceholder,
        feedback: lastNameFeedback
    },
    "Email": {
        regex: /^\w+@\w+\.\w{2,3}$/,
        placeholder: emailPlaceholder,
        feedback: emailFeedback
    },
    "Password": {
        regex: /^[\w@-]{4,20}$/,
        placeholder: passwordPlaceholder,
        feedback: passwordFeedback
    },
    "Telephone": {
        regex: /^\d{3}-\d{3}-\d{4}$/,
        placeholder: telephonePlaceholder,
        feedback: telephoneFeedback
    },
    "Your Bio": {
        regex: /^[a-z\d_'"\s]{4,50}$/,
        placeholder: yourBioPlaceholder,
        feedback: yourBioFeedback
    }
};



/* DEFINIZIONE DI ELEMENTI HTML */

const formDiv = document.querySelector("#formDiv");

const submitButton = document.querySelector("#submitButton");



/* FUNZIONI */

function initInputDiv(fields=formFields) {
    for(const key in fields) {
        const formDivElement = createFormDivElement(fields, key);
        formDiv.appendChild(formDivElement); 
    }
}

function createFormDivElement(fields=formFields, field) {
    const formDivElement = document.createElement("div");
    formDivElement.classList.add("formDivElement");


    const formFieldName = document.createElement("p");
    formFieldName.classList.add("formFieldName");
    formFieldName.textContent = field + ":";

    const inputBar = document.createElement("input");
    inputBar.type = "text";
    inputBar.placeholder = fields[field].placeholder;
    
    const formFieldFeedback = document.createElement("p");
    formFieldFeedback.classList.add("formFieldFeedback");


    formDivElement.appendChild(formFieldName);
    formDivElement.appendChild(inputBar);
    formDivElement.appendChild(formFieldFeedback);

    return formDivElement;
}

function checkInput(fields=formFields, inputElement) {
    let allCorrect = undefined;

    if(inputElement.tagName == "INPUT")      checkSingleInput(fields, inputElement.parentElement, "wrongType");
    else {
        allCorrect = true;

        for(const elem of document.querySelectorAll("input")) {
            allCorrect = checkSingleInput(fields, elem.parentElement, "wrongSubmit") ? allCorrect : false;
        }
    }

    return allCorrect;
}

function checkSingleInput(fields=formFields, inputElement, applyClass) {
    const inputString = inputElement.querySelector("input").value;

    const inputFieldName = inputElement.querySelector(".formFieldName").textContent.slice(0, -1);
    const inputFieldBar = inputElement.querySelector("input");
    const inputFieldFeedback = inputElement.querySelector(".formFieldFeedback");

    const valid = (fields[inputFieldName].regex).test(inputString);

    if(valid) {
        inputFieldBar.classList.toggle("wrongSubmit", false);
        inputFieldBar.classList.toggle("wrongType", false);
        inputFieldFeedback.textContent = "";
    }
    else if(!valid && inputString.length >= 4) {
        inputFieldBar.classList.toggle(applyClass, true);
        inputFieldBar.classList.toggle((applyClass === "wrongType" ? "wrongSubmit" : "wrongType"), false);
        inputFieldFeedback.textContent = fields[inputFieldName].feedback;
        inputFieldFeedback.style.color = (applyClass === "wrongSubmit" ? "red" : null);
    }

    return valid;
}

function funzioneMaster(event) {
    const inputElement = event.target;
    const correct = checkInput(formFields, inputElement);

    if(correct) {
        const correctP = document.createElement("p");
        correctP.id = "correctP";
        correctP.textContent = "All the Field inserted are Correct!";

        document.body.appendChild(correctP);
    }
}



/* ESECUZIONE */

initInputDiv();

for(const elem of document.querySelectorAll("input")) {
    elem.addEventListener("input", funzioneMaster);
}

submitButton.addEventListener("click", funzioneMaster);









  