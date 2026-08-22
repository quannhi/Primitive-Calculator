const body = document.querySelector('body'),
container = document.querySelector('.container'),
display = document.querySelector('.display'), 
buttons = document.querySelector('.buttons')
let button_values = [7,8,9,'DEL', 'AC', 4,5,6,'x', '/', 1,2,3,'+','-',0,'.','NULL','Ans','='],
display_text=[]
let special_values = ['DEL','AC','NULL','=']
let operators = ['+','-','x','/']
function calculate(arr){
    let a = arr[0],b = arr[2],operator=arr[1]
    if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) display.textContent= 'ERROR. PRESS AC TO RESET'
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
        if (!operators.includes(button.textContent) && !Number.isNaN(Number(display_text[-1]))){
            display_text[-1]+= button.textContent
            display.textContent=display_text.join('')
        } else{
            display_text.push(button.textContent)
            display.textContent=display_text.join('')
        }
    }else{
        switch(button.textContent){
            case 'AC':
                display_text=[]
                display.textContent=display_text.join('')
                break
            case 'DEL':
                display_text= display_text.slice(0,-1)
                display.textContent=display_text.join('')
                break
            case '=':
                console.log(display_text)
                let result = calculate(display_text)
                display_text.splice(0,3,result)
                display.textContent=display_text.join('')
        }
    }
    if(!button)return;
})