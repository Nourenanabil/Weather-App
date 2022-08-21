const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");



weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault();

    const location = search.value;
    messageOne.textContent="Loading.."

    if(location==""){
        messageOne.textContent="Please enter a loaction";
    }
    else{

    

    fetch("/weather?address="+location).then((response)=>{

        response.json().then((data)=>{
    
                messageOne.textContent=data.city+" " + data.country ;
                messageTwo.textContent= data.forecast;
    
            })
            
        }).catch(error =>{

                messageOne.textContent="Error : Failed to find location , please try again";
                messageTwo.textContent=""
                   
                    })}
    })
