const body = document.querySelector('body'),
container = document.querySelector('.container'),
display = document.querySelector('.display'), 
buttons = document.querySelector('.buttons')
let button_values = [7,8,9,'DEL', 'AC', 4,5,6,'x', '/', 1,2,3,'+','-',0,'.','NULL','Ans','='],
display_text=[]
let special_values = ['DEL','AC','NULL','=']
let operators = ['+','-','x','/']
globalThis.result_seen=false
function calculate(arr, operator_index = 1){
    let a = arr[operator_index-1],b = arr[operator_index+1],operator=arr[operator_index]
    if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
        console.log(`ERROR OCCURRED, A AND B: ${a} and ${b}`)
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
        if (result_seen){
        display_text=[String(button.textContent)]
        display.textContent=display_text
        globalThis.result_seen=false
        } else {
        if (!operators.includes(button.textContent) && !Number.isNaN(Number(display_text[display_text.length -1]))){
            display_text[display_text.length -1]+= String(button.textContent)
            display.textContent=display_text.join('')
        } else{
            display_text.push(String(button.textContent))
            display.textContent=display_text.join('')
        }}
    }else{
        switch(button.textContent){
            case 'AC':
                display_text=[]
                display.textContent=display_text.join('')
                break
            case 'DEL':
                if (display_text[display_text.length-1] == '') display_text.splice(display_text.length-1,1)
                let trimmed = String(display_text[display_text.length -1]).slice(0,-1)
                console.log(trimmed)
                display_text.splice(display_text.length -1,1,trimmed)
                console.log(display_text)
                display.textContent=display_text.join('')
                break
            case '=':
                console.log(display_text)
                let repeat = true
                let operator_indexes=[]
                let buffer = 2
                if (['x', '/'].some(item => display_text.includes(item)) && ['+','-'].some(item=> display_text.includes(item))){
                    for (let index = 0; index < display_text.length; index++){
                        if (display_text[index] == '/' || display_text[index] == 'x'){
                            operator_indexes.push(index)
                        }
                    }
                    for (let operator_index of operator_indexes){
                        buffer -=2
                        let result = String(calculate(display_text, operator_index+buffer))
                        console.log(`op index: ${operator_index+buffer}`)
                        if (result === 'ERROR. PRESS AC TO RESET') display_text=[result]; else console.log(display_text.splice(operator_index+buffer-1,3,result))
                        display.textContent=display_text.join('')
                    }  
                    }
                while(repeat){              
                let result = calculate(display_text,1)
                if (result === 'ERROR. PRESS AC TO RESET') display_text=[result]; else console.log(display_text.splice(0,3,result))
                display.textContent=display_text.join('')
                if (display_text.length == 1){
                    repeat = false
                    globalThis.result_seen = true
                }
                }
                
                
        }
    }
    if(!button)return;
})