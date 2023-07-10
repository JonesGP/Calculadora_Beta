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
    if (valor == '+' || valor == '-' || valor == '÷' || valor == 'x'){
        temp += ' ' + valor + ' '

    }else if(valor == '()'){
        parentheses()
    }else if(valor == '√'){
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
    if (temp.indexOf('^') != -1){
        elevate()
    }
    while(temp.indexOf("√") != -1){
        square_root()
    }
    if(temp.indexOf('%') != -1){
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
    if (temp.indexOf('(') > -1 && (space_paren_true - temp.length) < -1 && quant_paren_open > quant_paren_closed && !(temp.substring(temp.length -1) == ' ')){
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
    if (temp.indexOf(' ', square_sin_index) == -1){
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


//     if (prox_value.length == 0 & temp.substring(per_index_final, per_first_space_index +1) != ''){
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
    if (per_full_vals.indexOf('√') != -1){
        per_full_vals = per_full_vals.substring(1, per_full_vals.length)
    }
    if (per_full_vals.indexOf('(') != -1){
        per_full_vals = per_full_vals.substring(1, per_full_vals.length)
    }
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

    if (cal_simple.style.width == '300px' || cal_simple.style.width == ''){
        cal_simple.style.width = '400px'
    }else{
        cal_simple.style.width = '300px'
    }

    all_cin_buttons.forEach(e => {
        e.style.display = e.style.display == 'table-cell' ? 'none' : 'table-cell'
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
    if (temp.substring(temp.length-1) == ')') {
        quant_paren_closed -= 1
    }else if (temp.substring(temp.length-1) == '(') {
        quant_paren_open -= 1
    }
    if (temp.substring(temp.length - 1) == ' ') {
        temp = temp.substring(0, temp.length - 2)
    }else if( result.textContent) {
        let res             = document.getElementById('resultado').innerHTML
        result.innerHTML    = res.substring(0, res.length -1);
        temp                = temp.substring(0, temp.length -1)
    }
    
}


// Interface

let bubbles_btn = document.querySelector('.bubbles-btn')
let btn_invert = true
let btn_interface_mopen = true
let btn_interface_menu = document.querySelector('.interface-one')

function off_bubbles(){
    let bubbles = document.querySelector('.bubbles')
    if (btn_invert == false) {
        bubbles.style.display = "none";
        btn_invert = !btn_invert

        localStorage.removeItem("bubbles")
    }
    else{
        btn_invert = false
        bubbles.style.display = "flex"
        localStorage.setItem("bubbles", "on")
        
    }
}

// função para abrir a interface
function menu_interface_open(){
    if(btn_interface_mopen == true){
        btn_interface_menu.style.opacity = "1"
        btn_interface_menu.classList.add("interface-one-open")
        btn_interface_mopen = !btn_interface_mopen
    }
    else{
        btn_interface_mopen = true
        btn_interface_menu.style.opacity = "0"
        btn_interface_menu.classList.remove("interface-one-open")
    }
}

// função para ligar o modo escuro
let theme_btn = document.querySelector(".theme-btn")
let ball_theme = document.querySelector("#ball-theme")
let html = document.querySelector("html")
let moon = document.querySelector(".fa-moon")
let sun = document.querySelector(".fa-sun")
let ball_position = true
function dark_menu(){
    if (ball_position == true){
        ball_theme.style.transform = "translate(10px,-10px)"
        sun.style.display = "none"
        moon.style.display = "inline-block"
        html.classList.add("dark-mode")
        ball_position = false

        localStorage.setItem("dark-mode", "dark-mode-on")
    }
    else{
        ball_position = true
        sun.style.display = "inline-block"
        moon.style.display = "none"
        ball_theme.style.transform = "translate(-10px,-10px)"
        html.classList.remove("dark-mode")

        localStorage.removeItem("dark-mode")
    }
}

// função para mudar o tema
let all_themes = document.querySelector('#temas')
function change_theme(){

    let option_value = all_themes.options[all_themes.selectedIndex].value // seleciona o valor do item que esta selecionado
    if (option_value == 'black-theme'){
        html.classList.add("black-theme")
        theme_btn.classList.add("not-click")
        dark_menu(ball_position = false)
        
        localStorage.setItem("current_theme", "black-theme") // salva o valor
    }
    if (option_value == 'red-blue-grass'){
        html.classList.remove('black-theme')
        theme_btn.classList.remove("not-click")

        localStorage.setItem("current_theme", "red-blue-grass")
    }
}

// salvar no local storage os resultados e temas

let current_theme = localStorage.getItem("current_theme")
let dark_mode_load = localStorage.getItem('dark-mode')
let bubbles_onoff = localStorage.getItem("bubbles")
let option_theme = null
function load_save_theme(){
    if (current_theme == "black-theme"){
        option_theme = all_themes.options[all_themes.selectedIndex]
        html.classList.add('black-theme')
        theme_btn.classList.add("not-click")
        all_themes.selectedIndex = 1 //muda o selected das options do select
    }
    if(current_theme == "red-blue-grass"){
        option_theme = all_themes.options[all_themes.selectedIndex]
        if (dark_mode_load == "dark-mode-on"){
            dark_menu(ball_position = true)
        }
    }

    if(bubbles_onoff == "on"){
        off_bubbles(btn_invert = true)
    }
}
load_save_theme()

