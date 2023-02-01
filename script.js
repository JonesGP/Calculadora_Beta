let result = document.querySelector('#resultado')
let equals = document.querySelector('.bt-cal-simp-equals')
let list_numbers = []
let temp = []
let temp_no_space = []
function insert( valor ) {
    if (valor == '+' || valor == '-' || valor == '/' || valor == '*'){
        temp += ' ' + valor + ' '
    }else{
        temp += valor
    }
    temp_no_space = temp.replace(/\s/g, '')
    result.innerHTML = temp_no_space
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
        let res = document.getElementById('resultado').innerHTML
        result.innerHTML = res.substring(0, res.length -1);
        temp = temp.substring(0, temp.length -1)
    }
}

function igual() {
    while(temp.indexOf('%') != -1){
        percentage()
    }
    document.getElementById('resultado').innerHTML = eval(temp)
}

function percentage(){
    let per_index_final = temp.indexOf('%')
    let per_first_space_index = temp.lastIndexOf(' ' , per_index_final)
    let per_value = parseInt(temp.substring(per_index_final, per_first_space_index +1))
    let prox_space_index = temp.lastIndexOf(' ', per_index_final - (per_value.toString().length + 2))
    let prox_space_value_index = temp.lastIndexOf(' ', prox_space_index -1)
    let prox_value = temp.substring(prox_space_value_index, prox_space_index)
    let betw_perc = temp.substring(prox_space_index + 1, per_first_space_index )
    console.log(temp.substring(prox_space_index + 1, per_first_space_index))
    console.log(temp)
    if (betw_perc == '+'){
        let per_result = (per_value / prox_value)
    }
    temp = temp.replace(per_value.toString(), per_result)
    temp = temp.replace('%', '')


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

function insetpar(){
    
}
