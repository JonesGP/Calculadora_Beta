let result = document.querySelector('#resultado')
let equals = document.querySelector('.bt-cal-simp-equals')
let list_numbers = []
let temp = []
let temp_no_space = []

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
    result.innerHTML = temp_no_space
}


function igual() {
    while(temp.indexOf('%') != -1){
        percentage()
    }
    calc_parentheses()
    console.log(temp)
    document.getElementById('resultado').innerHTML = eval(temp)
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
    console.log(temp)
}
//quando clicar no botao igual ele vai verificar a primeira ocorrencia de ( e vai pegar o valor a partir dai ate o primeiro ) para fazer a soma e no final vai apagar esses parenteses

function calc_parentheses(){
    let paren_open_index = temp.lastIndexOf('(', temp.length) + 1
    let paren_closed_idex = temp.indexOf(')', paren_open_index)
    let paren_value = temp.substring(paren_open_index, paren_closed_idex)
    if(paren_value.indexOf('%')){
        percentage()
    }
    let paren_calc_final = eval(paren_value)
    console.log(paren_calc_final)
    temp = temp.replace('('+paren_value+')', paren_calc_final)

}

function percentage() {
    let per_index_final         = temp.indexOf('%')
    let per_first_space_index   = temp.lastIndexOf(' ' , per_index_final)
    let per_value               = parseInt(temp.substring(per_index_final, per_first_space_index +1)) //valor da porcentagem

    let prox_space_index        = temp.lastIndexOf(' ', per_index_final - (per_value.toString().length + 2))
    let prox_space_value_index  = temp.lastIndexOf(' ', prox_space_index -1)
    let prox_value              = temp.substring(prox_space_value_index + 1, prox_space_index) //valor a frente da porcentagem

    let betw_perc               = temp.substring(prox_space_index + 1, per_first_space_index ) // pega o sinal entre os numeros da porcentagem
    let per_result              = ''

    if (betw_perc != ''){
        per_result = (per_value * (prox_value / 100))
        let result_prox_value_with_perc = eval(prox_value+betw_perc+per_result)
        temp = temp.replace(temp.substring(prox_space_value_index+1, per_index_final)+'%', result_prox_value_with_perc.toFixed(14))
    }else{
        per_result = (per_value / 100)
        temp = temp.replace((temp.substring(per_first_space_index + 1, per_index_final)+'%').toString(), per_result.toFixed(14))
    }
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
}

function del(){
    if ( result.textContent) {
        let res             = document.getElementById('resultado').innerHTML
        result.innerHTML    = res.substring(0, res.length -1);
        temp                = temp.substring(0, temp.length -1)
    }
}