const allInputBoxes = document.querySelectorAll('.circle')
const allInputFields = document.querySelectorAll('.inputText')
const alertMessage = document.querySelector('.alertMessage')
const progressResult = document.querySelector('.progressResult')
const progressSpanText = document.querySelector('.progressResult span')
const progressMessage = document.querySelector('.firstPara')
const inputList = document.querySelector('.inputList')
const messageList = [
   'Raise the bar by completing your goals!',
   'Well begun is half done!',
   'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'] || 'Raise the bar by completing your goals!';
const addButton = document.querySelector('.addNewGoal')
const resetButton = document.querySelector('.reset')


// let count = 4;
// addButton.addEventListener('click',()=>{
//     const myHTML = `<div id="inputBox${count}" class="inputBox">
//              <div id="circle${count}" class="circle"><img class="check" src="/resources/check.svg" alt=""></div>
//              <input required  name="input${count}" id="inputText${count}" class="inputText" type="text" placeholder="Add new goal...">
//            </div>`
//            count++;
//     inputList.innerHTML += myHTML;
    
//     localStorage.setItem('inputListHTML', inputList.innerHTML);
//     localStorage.setItem('inputCount', count);
// })



allInputBoxes.forEach((inputBox)=>{
    inputBox.addEventListener('click',(e)=>{
        const allGoalFilled = [...allInputFields].every((input)=>{
            return input.value;
        });
        if(allGoalFilled){

            const inputBoxParent = inputBox.parentElement;
            inputBoxParent.classList.toggle('completed');
            // console.log(inputBoxParent.classList);

            const inputField = inputBoxParent.querySelector('.inputText');
            const inputId = inputField.id;
            if(goalsList[inputId]){
            // goalsList[inputId].completed = !goalsList[inputId].completed;
            goalsList[inputId].completed = inputBoxParent.classList.contains('completed');
            }
            localStorage.setItem('goalsList',JSON.stringify(goalsList))
     
            const completedTasks = document.querySelectorAll('.completed').length;
            const progressPercentage = (completedTasks / allInputBoxes.length) * 100;
            progressResult.style.width = `${progressPercentage}%`;

            if (completedTasks >= 1) {
                progressSpanText.innerText = `${completedTasks}/${allInputBoxes.length} Done`;
            }

            progressMessage.innerText = messageList[completedTasks] || 'Raise the bar by completing your goals!';
  

            
resetButton.addEventListener('click',()=>{
    localStorage.clear();

    
    inputList.innerHTML = `
        <div id="inputBox1" class="inputBox">
            <div id="circle1" class="circle"><img class="check" src="/resources/check.svg" alt=""></div>
            <input required name="input1" id="inputText1" class="inputText" type="text" placeholder="Add new goal...">
        </div>
        <div id="inputBox2" class="inputBox">
            <div id="circle2" class="circle"><img class="check" src="/resources/check.svg" alt=""></div>
            <input required name="input2" id="inputText2" class="inputText" type="text" placeholder="Add new goal...">
        </div>
        <div id="inputBox3" class="inputBox">
            <div id="circle3" class="circle"><img class="check" src="/resources/check.svg" alt=""></div>
            <input required name="input3" id="inputText3" class="inputText" type="text" placeholder="Add new goal...">
        </div>
    `;

    count = 4;

    progressResult.style.width = '0%'
    progressSpanText.innerText = ""
    allInputFields.forEach((input)=>{
       input.parentElement.classList.remove('completed')
        input.value = "";

    })   
})
        }
        else{
            alertMessage.style.visibility ='visible'
            alertMessage.innerText = `Please set all the ${allInputBoxes.length} goals!`
        }
    })
})







// this function will return whether all three goal are set or not
// [...allInputFields].every((input)=>{
//     return input.value;
// })


const goalsList = JSON.parse(localStorage.getItem('goalsList')) || {};

allInputFields.forEach((input)=>{
    if(goalsList[input.id]){
        input.value = goalsList[input.id].name || "";
        

        if(goalsList[input.id].completed){
            input.parentElement.classList.add('completed')
        }
    
    }

    

    input.addEventListener('focus',()=>{
         alertMessage.style.visibility= 'hidden';
    })

    input.addEventListener('input',(e)=>{

        if (goalsList[input.id] && goalsList[input.id].completed) {
            input.value = goalsList[input.id].name
            return
          }

        if(goalsList[input.id]){
            goalsList[input.id].name = input.value;
        }
        else{
            goalsList[input.id] = {
                name: input.value,
                completed: false,
            };
        }
       
        localStorage.setItem('goalsList',JSON.stringify(goalsList))
    })
})

function updateProgressBar() {
    const completedTasks = document.querySelectorAll('.completed').length;
    const progressPercentage = (completedTasks / allInputBoxes.length) * 100;
    progressResult.style.width = `${progressPercentage}%`;

    if (completedTasks >= 1) {
        progressSpanText.innerText = `${completedTasks}/${allInputBoxes.length} Done`;
    }

    progressMessage.innerText = messageList[completedTasks]

}


updateProgressBar();

