let result = document.querySelector('#resultado')
let equals = document.querySelector('.bt-cal-simp-equals')
let list_numbers = []
let temp = []
let temp_no_space = []
let perc = '%'
let expo_value = ''
let results_val = []

let quant_paren_open = 0
let quant_paren_closed = 0
function insert( valor ) {
    if (valor === '+' || valor === '-' || valor === '÷' || valor === 'x'){
        temp += ' ' + valor + ' '

    }else if(valor === '()'){
        parentheses()
    }else if(valor === '√'){
        temp += valor
    }else{
        temp += valor
    }
    temp_no_space = temp.replace(/\s/g, '')//regex
    result.innerHTML = temp_no_space
}


function igual() {
    result_no_result = temp
    if (temp.indexOf('÷') != -1){
        temp = temp.replaceAll('÷', '/')
    }
    if (temp.indexOf('x') != -1){
        temp = temp.replaceAll('x','*')
    }
    while (temp.indexOf('^') != -1){
        elevate()
    }
    while(temp.indexOf("√") != -1){
        square_root()
    }
    while(temp.indexOf('%') != -1){
        percentage()
    }
    if ((temp.indexOf('(') != -1) || temp.indexOf(')') != -1){
        calc_parentheses()
    }
    temp = eval(temp)
    save_results()
    document.getElementById('resultado').innerHTML = parseFloat(temp.toFixed(6))
}

// manipulação dos resultados seja salvar como recarregar
let val_results_html = document.querySelector('.val-results')
function save_results() {
    results_val.unshift(result_no_result + ' = ' + temp) // unshift adiciona no inicio de uma array
    val_results_html.insertAdjacentHTML('afterbegin', results_val[0] + '<button class="btn-results">+</button>'+ '<br>') // insertAdjacentHTML adiciona um elemento com base no primeiro argumento
    localStorage.setItem('resultados-calc', JSON.stringify(results_val))
}
function clear_results_list(){
    results_val = []
    val_results_html.innerHTML = ""
    localStorage.removeItem("resultados-calc")
}
if(localStorage.hasOwnProperty("resultados-calc")){
    results_val = JSON.parse(localStorage.getItem("resultados-calc"))
    for(var i = results_val.length -1; i > -1; i--){
        val_results_html.insertAdjacentHTML('afterbegin', results_val[i] + '<button class="btn-results">+</button>'+ '<br>')
    }
}

//função para adicionar parenteses
function parentheses(){
    let space_paren_true = temp.lastIndexOf('(', temp.length)
    if (temp.indexOf('(') > -1 && (space_paren_true - temp.length) < -1 && quant_paren_open > quant_paren_closed && !(temp.substring(temp.length -1) === ' ')){
        temp += ' )'
        quant_paren_closed += 1

    }else{
        temp += '( '
        quant_paren_open += 1
    }
}
//quando clicar no botao igual ele vai verificar a primeira ocorrencia de ( e vai pegar o valor a partir dai ate o primeiro ) para fazer a soma e no final vai apagar esses parenteses

function calc_parentheses(){
    let paren_open_index = temp.lastIndexOf('(', temp.length) + 1
    let paren_closed_idex = temp.indexOf(')', paren_open_index)
    let paren_value = temp.substring(paren_open_index, paren_closed_idex)
    let paren_calc_final = eval(paren_value).toFixed(6)
    temp = temp.replace('('+paren_value+')', paren_calc_final)
}

function square_root(){
    let square_sin_index = temp.indexOf('√') + 1
    let square_value = temp.substring(square_sin_index, temp.indexOf(' ', square_sin_index))
    if (temp.indexOf(' ', square_sin_index) === -1){
        square_value = temp.substring(square_sin_index, temp.length)
        temp = temp.replace(temp.substring(square_sin_index-1, temp.length), Math.sqrt(square_value))
        return
    }
    temp = temp.replace(temp.substring(square_sin_index-1, temp.indexOf(' ', square_sin_index)), Math.sqrt(square_value))
}


// function percentage() {
//     console.log(temp)
//     let per_index_final         = temp.indexOf('%'),
//         per_first_space_index   = temp.lastIndexOf(' ' , per_index_final),
//         per_value_string        = temp.substring(per_index_final, per_first_space_index +1) //valor da porcentagem
//     if (per_value_string.indexOf('√') != -1){
//         per_value_string = per_value_string.substring(1, per_value_string.length)
//     }
//     if (per_value_string.indexOf('(') != -1){
//         per_value_string = per_value_string.substring(1, per_value_string.length)
//     }
//     console.log(per_value_string)
//     let per_value               = parseInt(per_value_string), // converte o valor da porcentagem de string para inteiro
//         prox_space_index        = temp.lastIndexOf(' ', per_index_final - (per_value.toString().length + 2)),
//         prox_space_value_index  = temp.lastIndexOf(' ', prox_space_index -1),
//         prox_value              = temp.substring(prox_space_value_index + 1, prox_space_index), //valor a frente da porcentagem
//         betw_perc               = temp.substring(prox_space_index + 1, per_first_space_index ), // pega o sinal entre os numeros da porcentagem
//         per_result              = ''

//     if (per_value_string.indexOf('(') != -1){
//         prox_space_value_index = prox_space_value_index + 1
//     }
//     per_value_string = remove_first_paren(per_value_string)


//     if (prox_value.indexOf('(') != -1){
//         prox_space_value_index = prox_space_value_index + 1
//         prox_value = remove_first_paren(prox_value)
//     }


//     if (prox_value.length === 0 & temp.substring(per_index_final, per_first_space_index +1) != ''){
//         console.log(per_value)
//         per_result = (per_value / 100)
//         console.log(temp)
//         temp = temp.replace((temp.substring(prox_space_value_index + 1, per_index_final)+'%').toString(), per_result.toFixed(6))
//         console.log(temp)

//     }else if (betw_perc != '' & betw_perc != ' '){
//         per_result = (per_value * (prox_value / 100))
//         let result_prox_value_with_perc = eval(prox_value+betw_perc+per_result)
//         temp = temp.replace(temp.substring(prox_space_value_index+1, per_index_final)+'%', result_prox_value_with_perc.toFixed(6))

//     }else{
//         per_result = (per_value / 100)
//         temp = temp.replace((temp.substring(per_first_space_index + 1, per_index_final)+'%').toString(), per_result.toFixed(6))
//     }
// }

function percentage(){
    let per_index = temp.indexOf("%")
    let per_first_space_index = temp.lastIndexOf(' ', (temp.lastIndexOf(' ', per_index) - 3))
    console.log(temp.lastIndexOf(' ', per_index))
    let per_full_vals = temp.substring(per_first_space_index + 1, per_index) //valor de todos o conjunto da porcentagem
    console.log(per_full_vals)
    // if (per_full_vals.indexOf('√') != -1){
    //     per_full_vals = per_full_vals.substring(1, per_full_vals.length)
    // }
    // if (per_full_vals.indexOf('(') != -1){
    //     per_full_vals = per_full_vals.substring(1, per_full_vals.length)
    // }
    let per_val = per_full_vals.substring(per_full_vals.length, per_full_vals.lastIndexOf(" ", per_full_vals) + 1) //valor da porcentagem
    let per_prox_val = per_full_vals.substring(-1, per_full_vals.indexOf(' ')) //valor do numero proximo da porcentagem
    let per_sinal = per_full_vals.substring(per_full_vals.indexOf(' '), per_full_vals.lastIndexOf(' ')) //valor do sinal
    let per_result = ''

    if (per_sinal != '' & per_sinal != ' '){
        per_result = (per_val * (per_prox_val / 100))
        let result_prox_value_with_perc = eval(per_prox_val + per_sinal + per_result)
        temp = temp.replace(temp.substring(per_first_space_index, per_index)+'%', result_prox_value_with_perc.toFixed(6))
    }else{
        per_result = (per_val / 100)
        temp = temp.replace((temp.substring(per_first_space_index + 1, per_index)+'%').toString(), per_result.toFixed(6))
        console.log('quarta condição')
    }
}

function remove_first_paren(value){
    value = value.substring(value.lastIndexOf('(') + 1, value.length)
    return value
}

function elevate(){
    let value = temp.substring(temp.lastIndexOf(' ' , temp.indexOf('^')) + 1, temp.indexOf('^'))
    if (value.indexOf('(') != -1){
        value = value.substring(value.lastIndexOf('(') + 1, value.length)
    }

    if(value.indexOf('%') != -1){
        value = value / 100
    }

    if ( temp.indexOf(' ', temp.indexOf('^')) != -1) {
        expo_value = temp.substring(temp.indexOf('^') + 1, temp.indexOf(' ', temp.indexOf('^')))
    }else{
        expo_value = temp.substring(temp.indexOf('^') + 1, temp.length)
    }

    if (expo_value.indexOf(')') != -1){
        expo_value = expo_value.substring(0,expo_value.indexOf(')'))
    }

    const elevate_result = Math.pow(parseFloat(value), parseFloat(expo_value))
    temp = temp.replace(value.toString() + '^' + expo_value, ' ' + elevate_result.toString())
}


function cinstyle() {
    let cal_simple      = document.querySelector('.cal-simple')
    let all_cin_buttons = document.querySelectorAll('[cin-calc]')

    if (cal_simple.style.width === '300px' || cal_simple.style.width === ''){
        cal_simple.style.width = '400px'
    }else{
        cal_simple.style.width = '300px'
    }

    all_cin_buttons.forEach(e => {
        e.style.display = e.style.display === 'table-cell' ? 'none' : 'table-cell'
    })

}

function clean() {
    result.innerHTML = '';
    let res = document.getElementById('resultado').innerHTML
    result.innerHTML = res.substring(0,res.length - 1)
    temp = []
    temp_no_space = []
    quant_paren_closed = 0
    quant_paren_open = 0
}

function del(){
    if(temp.length <= 0){
        return
    }
    if (temp.substring(temp.length-1) === ')') {
        quant_paren_closed -= 1
    }else if (temp.substring(temp.length-1) === '(') {
        quant_paren_open -= 1
    }
    if (temp.substring(temp.length - 1) === ' ') {
        temp = temp.substring(0, temp.length - 2)
    }else if( result.textContent) {
        let res             = document.getElementById('resultado').innerHTML
        result.innerHTML    = res.substring(0, res.length -1);
        temp                = temp.substring(0, temp.length -1)
    }
}

// Interface
let bubbles_btn = document.querySelector('.bubbles-btn')
let btn_invert = false
let btn_interface_mopen = false
let btn_interface_menu = document.querySelector('.interface-one')

function off_bubbles(){
    let bubbles = document.querySelector('.bubbles')
    btn_invert = !btn_invert
    bubbles.style.display = btn_invert ? "none" : "flex"
    localStorage.setItem("bubbles", btn_invert ? "off" : "on")
}

/**
 * Toggle the interface menu and update the visibility and opacity of the button.
 */
function menu_interface_open() {
    // Toggle the "interface-one-open" class of btn_interface_menu
    btn_interface_menu.classList.toggle("interface-one-open");
    
    // Update the value of btn_interface_mopen to its opposite
    btn_interface_mopen = !btn_interface_mopen;
    
    // Update the opacity of btn_interface_menu based on btn_interface_mopen
    btn_interface_menu.style.opacity = btn_interface_mopen ? "1" : "0";
}

// função para ligar o modo escuro
let ball_theme = document.querySelector("#ball-theme")
let html = document.querySelector("html")
let moon = document.querySelector(".fa-moon")
let sun = document.querySelector(".fa-sun")
let isDarkModeOn = true
function dark_mode(){
    ball_theme.style.transform = isDarkModeOn ? "translate(10px,-10px)" : "translate(-10px,-10px)"
    sun.style.display = isDarkModeOn ? "none" : "inline-block"
    moon.style.display = isDarkModeOn ? "inline-block" : "none"
    if(isDarkModeOn){
        html.classList.add("dark-mode")
    }else{
        html.classList.remove("dark-mode")
    }
    localStorage.setItem("dark-mode", isDarkModeOn ? "on" : "off")
    isDarkModeOn = !isDarkModeOn
}

// função para mudar o tema
let theme_btn = document.querySelector(".theme-btn")
let all_themes = document.querySelector('#temas')
function change_theme(){
    const optionValue = all_themes.options[all_themes.selectedIndex].value // seleciona o valor do item que esta selecionado

    if (optionValue === 'black-theme'){
        html.classList.add("black-theme")
        theme_btn.classList.add("not-click")
        dark_mode(isDarkModeOn = false)  
        localStorage.setItem("current_theme", "black-theme") // salva o valor
    }else if (optionValue === 'red-blue-grass'){
        html.classList.remove('black-theme')
        theme_btn.classList.remove("not-click")
        localStorage.setItem("current_theme", "red-blue-grass")
    }
}

let ballon_text_container = document.querySelector(".ballon-text-conteiner")
let ballon_text = document.querySelector(".ballon-text")
let ballon_text_btn_skip = document.querySelector(".ballon-text-btn-skip")
let ballon_text_btn_continue = document.querySelector(".ballon-text-btn-continue")
let tutorial_position = 0
function start_tutorial(){
    if (tutorial_position === 0){
        ballon_text_container.style.display = 'flex'
    }
    ballon_text_btn_continue.style.display = tutorial_position === 9 ? 'none' : 'inline-block'
    if (tutorial_position === 10){
        skip_tutorial()

    }
    ballon_text_container.style.transform = texts_tutorial[tutorial_position].position
    ballon_text_container.style.top = texts_tutorial[tutorial_position].top
    ballon_text_container.style.left = texts_tutorial[tutorial_position].left
    ballon_text.innerHTML = texts_tutorial[tutorial_position].text
    if (tutorial_position === 2){
        menu_interface_open()
    }
    else if (tutorial_position === 7){
        menu_interface_open()
    }
}
function continue_tutorial(){
    tutorial_position += 1
    start_tutorial()
}
function skip_tutorial(){
    console.log('teste')
    ballon_text_container.style.display = 'none'
    tutorial_position = 0
}

// salvar no local storage os resultados e temas
let current_theme = localStorage.getItem("current_theme")
let dark_mode_load = localStorage.getItem('dark-mode')
let bubbles_onoff = localStorage.getItem("bubbles")
let option_theme = null
function load_save_theme(){
    if (current_theme === "black-theme"){
        option_theme = all_themes.options[all_themes.selectedIndex]
        html.classList.add('black-theme')
        theme_btn.classList.add("not-click")
        all_themes.selectedIndex = 1 //muda o selected das options do select
    }else if(current_theme === "red-blue-grass"){
        option_theme = all_themes.options[all_themes.selectedIndex]
        if (dark_mode_load == "on"){
            dark_mode(isDarkModeOn = true)
        }
    }

    if(bubbles_onoff === "on"){
        off_bubbles(btn_invert = true)
    }else if(bubbles_onoff === "off"){
        off_bubbles(btn_invert = false)
    }
}
load_save_theme()

function open_changelog(){
    let changelog = document.querySelector('.changelog-text')
    changelog.style.display = changelog.style.display === 'flex' ? 'none' : 'flex'
}
let lang_index = 0
function change_langue(language){
    let now_language = ''
    if (language === "pt-BR"){
        now_language = texts_tutorial
        lang_index = 0
    }else if (language === "en-US"){
        now_language = texts_tutorial_en
        lang_index = 1
    }else if (language === "es-ES"){
        now_language = texts_tutorial_es
        lang_index = 2
    }else if (language == "it-IT"){
        now_language = texts_tutorial_it
        lang_index = 3
    }else if (language === "fr-FR"){
        now_language = texts_tutorial_fr
        lang_index = 4
    }else if (language === "nl-NL"){
        now_language = texts_tutorial_nl
        lang_index = 5
    }else if (language === "pl-PL"){
        now_language = texts_tutorial_pl
        lang_index = 6
    }else if (language === "de-DE"){
        now_language = texts_tutorial_de
        lang_index = 7
    }else if(language === "ru-RU"){
        now_language = texts_tutorial_ru
        lang_index = 8
    }

    for(let i = 0; i < texts_tutorial.length; i++){
        texts_tutorial[i].text = now_language[i].text
    }
    localStorage.setItem('language', language)
}
let now_save_lang = localStorage.getItem('language')
if (now_save_lang === null){
    now_save_lang = 'pt-BR'
}
let languages = document.getElementById('languages')

change_langue(now_save_lang)
if (now_save_lang != null){
    languages.selectedIndex = lang_index
}

let list_texts_items = [
    document.querySelector('title'),
    document.querySelector('.btn-menu'),
    document.querySelector('.bubbles-btn'),
    document.querySelector('#red-blue-grass'),
    document.querySelector('#black-theme'),
    document.querySelector('.tutorial-start-btn'),
    document.querySelector('.results-menu'),
    document.querySelector('.clear-btn'),
    document.querySelector('.changelog-btn'),
]
for(let i = 0; i < list_texts_items.length; i++){
    list_texts_items[i].innerHTML = worlds_texts[lang_index][i]
}
console.log(list_texts_items)
// title_txt.innerHTML = worlds_en[0]
start_tutorial()