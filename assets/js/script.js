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
let tutorial_position = 0
function start_tutorial(){
    if (tutorial_position === 0){
        ballon_text_container.style.display = 'flex'
    }
    if (tutorial_position === 9){
        skip_tutorial()
    }
    ballon_text_container.style.transform = texts_tutorial[tutorial_position].position
    ballon_text_container.style.top = texts_tutorial[tutorial_position].top
    ballon_text_container.style.left = texts_tutorial[tutorial_position].left
    ballon_text.innerHTML = texts_tutorial[tutorial_position].text
    if (tutorial_position === 2){
        menu_interface_open()
    }
    if (tutorial_position === 6){
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
let changelog_versions = [
    {
        version: "v0.0.6 13.07.2023",
        added: [
            "adicionado changelog ao projeto para melhor versionamento do mesmo",
            "adicionado um botão para ver o changelog"
        ],
        fixed: [
            "corrigido bugs com o tema e melhorias de performance"
        ]
    },
    {
        version: "v0.0.5",
        added: [
            "adicionado a aba resultados com todas as operações feitas atualmente"
        ]
    },
    {
        version: "v0.0.4",
        added: [
            "adicionado o salvamento das configurações atuais no próprio navegador para quando recarregar a página as informações continuem"
        ]
    },
    {
        version: "v0.0.3",
        added: [
            "adicionado novo tema",
            "adicionado opção para poder desligar as bolhas para melhorar a performance",
            "adicionado modo escuro"
        ]
    },
    {
        version: "v0.0.2",
        added: [
            "cálculo com raiz quadrada, parênteses, porcentagem, pi, elevado",
            "melhorias no design"
        ]
    },
    {
        version: "v0.0.1",
        added: [
            "adicionado bolhas no fundo"
        ]
    },
    {
        version: "v0.0.0",
        added: [
            "versão inicial",
            "lançamento da calculadora topper"
        ]
    }
];

let texts_tutorial = [
    {
        top: '50%',
        left: '50%',
        position: 'translate(-150px, -400px)',
        text: 'Seja bem vindo a minha humilde calculadora, se quiser um tutorial de como funciona as coisa por aqui, clique no botão continuar, se não clique em pular.'
    },
    {
        top: '80px',
        left: '30px',
        position: '',
        text: 'Aqui é o menu, nele voce pode ativar e desativar as bolhas, a opção de modo escuro, e poder mudar o tema!'
    },
    {
        top: '100px',
        left: '40px',
        position: '',
        text: 'O botão bolhas, se ativado, irá mostrar o fundo com as bolhas com animação de reflexos, porém esse recurso consome muito processador.'
    },
    {
        top: '100px',
        left: '100px',
        position: '',
        text: 'O segundo botão ativa o modo escuro.'
    },
    {
        top: '100px',
        left: '150px',
        position: '',
        text: 'O terceiro abre uma lista com os temas para voce escolher.'
    },
    {
        top: '100px',
        left: '310px',
        position: '',
        text: 'O quarto abre o tutorial novamente.'
    },
    {
        top: '50%',
        left: '50%',
        position: 'translate(-150px, 300px)',
        text: 'Aqui nesta seçao ficaram armazenados todos os resultados que voce fez com as operações.'
    },
    {
        top: '50%',
        left: '50%',
        position: 'translate(-150px, -370px)',
        text: 'Aqui é a nossa calculadora que foi feita com o objetivo de melhorar a sua experiência e torna os calculos mais divertidos.'
    },
    {
        top: '82vh',
        left: '100px',
        position: '',
        text: 'E por ultimo, aqui você pode ver o changelog do projeto, com todas as alterações feitas.'
    }
]
start_tutorial()