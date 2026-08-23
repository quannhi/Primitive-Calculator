const body = document.querySelector('body'),
container = document.querySelector('.container'),
display = document.querySelector('.display'), 
buttons = document.querySelector('.buttons')
let button_values = [7,8,9,'DEL', 'AC', 4,5,6,'x', '/', 1,2,3,'+','-',0,'.','NULL','Ans','='],
display_text=[]
let special_values = ['DEL','AC','NULL','=']
let operators = ['+','-','x','/']
function calculate(arr, operator_index = 1){
    let a = arr[operator_index-1],b = arr[operator_index+1],operator=arr[operator_index]
    if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
        console.log(`${a} and ${b}`)
        return 'ERROR. PRESS AC TO RESET'
    }
    a = Number(a)
    b = Number(b)
    switch (operator){
        case '+':
            return a+b
        case '-':
            return a-b
        case 'x':
            return a*b
        case '/':
            return a/b
        default: 
            return 'ERROR'
    }
}
for (let value of button_values){
    let button = document.createElement('button')
    button.textContent=value
    button.classList.add('button')
    button.classList.add(value)
    buttons.appendChild(button)
}
buttons.addEventListener('mousedown', (e)=>{
    const button = e.target.closest('button')
    if(!special_values.includes(button.textContent)) {
        if (!operators.includes(button.textContent) && !Number.isNaN(Number(display_text[display_text.length -1]))){
            display_text[display_text.length -1]+= String(button.textContent)
            display.textContent=display_text.join('')
        } else{
            display_text.push(String(button.textContent))
            display.textContent=display_text.join('')
        }
    }else{
        switch(button.textContent){
            case 'AC':
                display_text=[]
                display.textContent=display_text.join('')
                break
            case 'DEL':
                let trimmed = String(display_text[display_text.length -1]).slice(0,-1)
                console.log(trimmed)
                display_text.splice(display_text.length -2,1,trimmed)
                console.log(display_text)
                display.textContent=display_text.join('')
                break
            case '=':
                console.log(display_text)
                // checking for mix of high and low priority operators
                while (['x', '/'].some(item => display_text.includes(item)) && ['+','-'].some(item=> display_text.includes(item))){
                    while(['x'].some(item=>display_text.includes(item))){
                        let operator_index= display_text.indexOf('x')
                        let result = calculate(display_text, operator_index)
                        console.log(`op index: ${operator_index}`)
                        
                        if (result === 'ERROR. PRESS AC TO RESET') display_text=[result]; else display_text.splice(operator_index-1,operator_index+2,result)
                        display.textContent=display_text.join('')
                    }
                    while(['/'].some(item=>display_text.includes(item))){
                        let operator_index= display_text.indexOf('/')
                        let result = calculate(display_text, operator_index)
                        console.log(`op index: ${operator_index}`)
                        if (result === 'ERROR. PRESS AC TO RESET') display_text=[result]; else display_text.splice(operator_index-1,operator_index+2,result)
                        display.textContent=display_text.join('')
                    }
                    break
                }
                let result = calculate(display_text)
                if (result === 'ERROR. PRESS AC TO RESET') display_text=[result]; else display_text.splice(0,3,result)
                display.textContent=display_text.join('')
                
        }
    }
    if(!button)return;
})