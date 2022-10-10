//Elementos del DOM
//select con un option en su interior
let translateFrom = document.querySelector('#translateFrom');
let translateTo = document.querySelector('#translateTo');

//btn traducir
let translateBtn = document.querySelector('#translate'); 

//textareas de ingreso y salida del texto
let inputTranslate = document.querySelector('#inputTranslate');
let outputTranslate = document.querySelector('#outputTranslate');

//Conseguir la lista de lenguajes desde el servidor
const GET_URL = 'https://text-translator2.p.rapidapi.com/getLanguages'

const OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2680a83f8dmsh7a53c34c7318ab8p1f6958jsn565f84d3585c',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

let source_language = "af";
let target_language = "af";

fetch(GET_URL, OPTIONS)
.then(res => res.json())
.then(objeto => {
    let languages = objeto.data.languages;
    //EL codigo necesario para cargar el select
    languages.forEach(element => {
        translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`;
        translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`;

    });
    
    translateFrom.addEventListener('click', () => {
        source_language = translateFrom.value;
    })

    translateTo.addEventListener('click', () => {
        target_language = translateTo.value
    })
})
.catch(err => console.log(err));


//recoger los datos del textarea para enviar al servidor
translateBtn.addEventListener('click', () =>{
    let texToTranslate = inputTranslate.value;

    const encodedParams = new URLSearchParams();
    console.log( source_language);
    encodedParams.append("source_language", source_language);
    encodedParams.append("target_language", target_language);
    encodedParams.append("text", texToTranslate);
    
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '2680a83f8dmsh7a53c34c7318ab8p1f6958jsn565f84d3585c',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };
    
    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => outputTranslate.innerText = response.data.translatedText)
        .catch(err => console.error(err));
});


