let result = document.querySelector('#resultado')
let equals = document.querySelector('.bt-cal-simp-equals')
let list_numbers = []
let temp = []
let temp_no_space = []
let perc = '%'
let expo_value = ''

let quant_paren_open = 0
let quant_paren_closed = 0
function insert( valor ) {
    if (valor == '+' || valor == '-' || valor == '/' || valor == '*'){
        temp += ' ' + valor + ' '

    }else if(valor == '()'){
        parentheses()
    }else{
        temp += valor
    }

    temp_no_space = temp.replace(/\s/g, '')//regex
    if (temp_no_space.indexOf('*') != -1){
        temp_no_space = temp_no_space.replaceAll('*','x')
        console.log('entrou')
    }
    result.innerHTML = temp_no_space
}


function igual() {
    if (temp.indexOf('^') != -1){
        elevate()
    }
    while(temp.indexOf('%') != -1){
        percentage()
        console.log('percentage')
    }
    console.log(temp.indexOf('%'))
    if ((temp.indexOf('(') != -1) || temp.indexOf(')') != -1){
        calc_parentheses()
    }
    temp = eval(temp)
    document.getElementById('resultado').innerHTML = parseFloat(temp.toFixed(6))
}
//função para adicionar parenteses
function parentheses(){
    let space_paren_true = temp.lastIndexOf('(', temp.length)
    if (temp.indexOf('(') > -1 && (space_paren_true - temp.length) < -1 && quant_paren_open > quant_paren_closed && !(temp.substring(temp.length -1) == ' ')){
        temp += ')'
        quant_paren_closed += 1

    }else{
        temp += '('
        quant_paren_open += 1
    }
}
//quando clicar no botao igual ele vai verificar a primeira ocorrencia de ( e vai pegar o valor a partir dai ate o primeiro ) para fazer a soma e no final vai apagar esses parenteses

function calc_parentheses(){
    console.log(temp)
    let paren_open_index = temp.lastIndexOf('(', temp.length) + 1
    console.log(paren_open_index)
    let paren_closed_idex = temp.indexOf(')', paren_open_index)
    console.log(paren_closed_idex)
    let paren_value = temp.substring(paren_open_index, paren_closed_idex)
    console.log(paren_value)
    let paren_calc_final = eval(paren_value).toFixed(6)
    console.log(paren_calc_final)
    console.log(temp)
    temp = temp.replace('('+paren_value+')', paren_calc_final)
    console.log(temp)

}









function percentage() {
    let per_index_final         = temp.indexOf('%'),
        per_first_space_index   = temp.lastIndexOf(' ' , per_index_final),
        per_value_string        = temp.substring(per_index_final, per_first_space_index +1) //valor da porcentagem
        let per_value               = parseInt(per_value_string)
        let prox_space_index        = temp.lastIndexOf(' ', per_index_final - (per_value.toString().length + 2)),
        prox_space_value_index  = temp.lastIndexOf(' ', prox_space_index -1),
        prox_value              = temp.substring(prox_space_value_index + 1, prox_space_index), //valor a frente da porcentagem
        betw_perc               = temp.substring(prox_space_index + 1, per_first_space_index ), // pega o sinal entre os numeros da porcentagem
        per_result              = ''
        
    if (per_value_string.indexOf('(') != -1){
        prox_space_value_index = prox_space_value_index + 1
        console.log('corrou1')
    }
    per_value_string = remove_first_paren(per_value_string)
    if (prox_value.indexOf('(') != -1){
        prox_space_value_index = prox_space_value_index + 1
        console.log('corrou2')
        prox_value = remove_first_paren(prox_value)
    }
    if (prox_value.length == 0 & temp.substring(per_index_final, per_first_space_index +1) != ''){
        per_result = (per_value / 100)
        temp = temp.replace((temp.substring(prox_space_value_index + 1, per_index_final)+'%').toString(), per_result.toFixed(6))
    }else if (betw_perc != '' & betw_perc != ' '){
        per_result = (per_value * (prox_value / 100))
        let result_prox_value_with_perc = eval(prox_value+betw_perc+per_result)
        temp = temp.replace(temp.substring(prox_space_value_index+1, per_index_final)+'%', result_prox_value_with_perc.toFixed(6))
    }else{
        per_result = (per_value / 100)
        temp = temp.replace((temp.substring(per_first_space_index + 1, per_index_final)+'%').toString(), per_result.toFixed(6))
    }

}







function elevate(){
    let value = temp.substring(temp.lastIndexOf(' ' , temp.indexOf('^')) + 1, temp.indexOf('^'))
    console.log(temp)
    if (value.indexOf('(') != -1){
        value = value.substring(value.lastIndexOf('(') + 1, value.length)
    }
    console.log(temp)
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

function remove_first_paren(value){
    console.log(value)
    if (value.indexOf('(') != -1){
        value = value.substring(value.lastIndexOf('(') + 1, value.length)
    }
    console.log(value)
    return value
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
    if (btn_invert == true) {
        bubbles.style.display = "none";
        btn_invert = !btn_invert
        console.log(btn_invert)
    }
    else{
        btn_invert = true
        bubbles.style.display = "flex"
    }
}

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

let ball_theme = document.querySelector("#ball-theme")
let body = document.querySelector("body")
let moon = document.querySelector(".fa-moon")
let sun = document.querySelector(".fa-sun")
let ball_position = true
function dark_menu(){
    if (ball_position == true){
        ball_theme.style.transform = "translate(10px,-10px)"
        sun.style.display = "none"
        moon.style.display = "inline-block"
        body.classList.add("mudar-tema")
        ball_position = false
    }
    else{
        ball_position = true
        sun.style.display = "inline-block"
        moon.style.display = "none"
        ball_theme.style.transform = "translate(-10px,-10px)"
        body.classList.remove("mudar-tema")
    }
}