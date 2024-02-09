function checkIsNumber(value){
    return typeof value ==="number" &&
    !isNaN(value);
}


document.addEventListener("DOMContentLoaded", ()=>{
    let form = document.querySelector(".date__input");
    var btn = document.querySelector(".wrapper__image")





    form.addEventListener("submit", ageLogic)
    btn.addEventListener("click",ageLogic)
    
    
    // input.style = "border: 1px solid hsl(0, 100%, 67%);"
})

function ageLogic(e){
    {
        e.preventDefault()
        
        
        // this section checks if any field is empty
        let day = document.querySelector("#day");
        let month = document.querySelector("#month");
        let year = document.querySelector("#year")
        let inputs = [day, month, year];
        let parents = [day.parentElement, month.parentElement, year.parentElement]


        // day--month map
        const dayMap = {
             1:31,
             2:28,
             3:31,
             4:30,
             5:31,
             6:30,
             7:31,
             8:31,
             9:30,
             10:31,
             11:30,
             12:31
        } 
       
        if(day.value=="" || month.value=="" || year.value==""){
            // checking for null values
            inputs.forEach((input)=>{
                let parent = input.parentElement
                let small = document.createElement("small")
                if(input.value==""){
                   
                    if(parent.classList.contains("error")){

                    }else{
                        
                        small.innerHTML = "this field is required";
                        small.style = "color:red;"
                        parent.classList.add("error")
                        parent.appendChild(small)
                        
                    }
                    
                }else{
                    if(parent.classList.contains("error")){
                        parent.classList.remove("error");
                        parent.removeChild(parent.children[2])
                    }else{
                        console.log("no error")
                    }
                }

            })
        }
        else{
            inputs.forEach((input)=>{
                let parent = input.parentElement
                if(parent.children[2]){
                    parent.classList.remove("error")
                    parent.removeChild(parent.children[2])
                }
            })

        }



        // checking if input is a number validation
        if(parents[0].classList.contains("error")|| parents[1].classList.contains("error") ||
            parents[2].classList.contains("error")){

        }else{
            inputs.forEach((input)=>{
                let parent = input.parentElement
                let small = document.createElement("small")

                if(checkIsNumber(parseInt(input.value))){
                    if(parent.classList.contains("error-nan")){
                        parent.classList.remove("error-nan");
                        parent.removeChild(parent.children[2])
                    }else{
                        console.log("they are numbers");
                    }    

                }else{
                    small.innerHTML = "enter a number please";
                    small.style = "color:red;"
                    parent.classList.add("error-nan")
                    parent.appendChild(small)
                }
            })
        }

        // checking if its a valid date
        if((parents[0].classList.contains("error")||parents[0].classList.contains("error-nan"))
            ||(parents[1].classList.contains("error")||parents[1].classList.contains("error-nan"))
            ||(parents[2].classList.contains("error")||parents[2].classList.contains("error-nan"))){
            console.log("error in date part")
        }else{
            // converting the input strings to integers
            day = parseInt(inputs[0].value)
            month = parseInt(inputs[1].value)
            year = parseInt(inputs[2].value)
            let parent0 =inputs[0].parentElement;
            let parent1 = inputs[1].parentElement;
            let parent2 = inputs[2].parentElement;

            // checking the month if it exceeds 12
            if(month>12){
                let small = document.createElement("small")
               
                small.innerHTML = "Invalid month";
                small.style = "color:red;"
                parent1.classList.add("error-nan")
                parent1.appendChild(small)

            }else{
                // checking if it already has an error message
                if(Array.from(parent1.children)[2]){
                    parent1.removeChild(Array.from(parent1.children)[2])
                    console.log("month has no issue")
                }
            }

            // checking if the day is valid for the given month
            if(new Date(year, month, day).getMonth()!==month){
                let small = document.createElement("small")
               
                small.innerHTML = "Invalid day";
                small.style = "color:red;"
               
                parent0.appendChild(small)
               
            
            }else{
                console.log("day valid")
                // checking year if its valid
                if(year>new Date().getFullYear()){
                    let small = document.createElement("small")
               
                    small.innerHTML = "Invalid Year!";
                    small.style = "color:red;"
                
                    parent2.appendChild(small)
                }else{
                     // checking if it already has an error message
                    if(Array.from(parent2.children)[2]){
                        parent2.removeChild(Array.from(parent1.children)[2])
                        console.log("year is invalid")
                    }
                    // age calculation logic
                    let year_output = document.querySelector(".date__output-years span");
                    let month_output = document.querySelector(".date__output-months span");
                    let day_output = document.querySelector(".date__output-days span");
                    
                   
                    let current_year = parseInt(new Date().getFullYear())
                    let current_month = parseInt(new Date().getMonth()) + 1
                    let current_day = parseInt(new Date().getDate()) 
                    console.log(current_year)
                  
                    // checking if you are in the birthday month
                    if(current_month<month){
                        year_output.innerHTML = (current_year-year-1)
                        month_output.innerHTML = current_day < day?((12+current_month) - month-1):((12+current_month) - month)
                        console.log("im here")
                        day_output.innerHTML = current_day < day?(dayMap[current_month-1]-day)+current_day:current_day-day;
                  
                    }else{
                        year_output.innerHTML = (current_year-year)
                        month_output.innerHTML = current_day < day?((12+current_month) - month-1):((current_month) - month)
                        console.log("im here")
                        day_output.innerHTML = current_day < day?(dayMap[current_month-1]-day)+current_day:current_day-day;
                    }
                }
            }
            
        }

       
    }
}

