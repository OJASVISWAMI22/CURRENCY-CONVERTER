let url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";//accessing all the elements required
const dropdown=document.querySelectorAll(".dropdown select");
let from_curr=document.querySelector(".from select");
let to_curr=document.querySelector(".to select");
const button=document.querySelector("button");
const display_message=document.querySelector(".msg");
//accessing both currency selector 
for(let select of dropdown){
    for(code in countryList){
        //ccreating all the options for our choice 
        let option=document.createElement("option");
            option.innerText=code;
            option.value=code;
            //to select usd  by defalut
         if(select.name==="from" && code==="USD"){
             option.selected="selected";
        }
        //to choose inr by default
        else if(select.name==="to" && code==="INR"){
            option.selected="selected";
        }
        //adding the option choosen to the page
    select.append(option);
    }//to update the falg displaying when differnet option is choosen
    select.addEventListener("change",(evt)=>{
    changeflag(evt.target);
    console.log(evt.target.value);
    })
}
//creating a function to change flag display
const changeflag=(newflag)=>{
    let country=countryList[newflag.value];
    //accessing country name
    let newcountry=`https://flagsapi.com/${country}/flat/64.png`;
    let flagimg=newflag.parentElement.querySelector("img");
    flagimg.src=newcountry;
}
//assing eventlistner to button 
button.addEventListener("click",async(evt)=>{//function set async as we need to fetch api
    evt.preventDefault();//preventing any reloading of page when button is pressed
    let amount=document.querySelector("input");
    //setting default value as 1
    if(amount.value===""|| amount.value<1){
        amount.value=1;
    }
    const new_url=`${url}/${from_curr.value.toLowerCase()}/${to_curr.value.toLowerCase()}.json`;
    let response=await fetch(new_url);//using await to tackle asynchronous methods
    let response_data=await response.json();//converting data aavailable in readable format
    let rate=response_data[to_curr.value.toLowerCase()];
    let finalamount=amount.value * rate;//calculating final amount in required currency
    display_message.innerText=`${amount.value} ${from_curr.value} = ${finalamount} ${to_curr.value}`;
    //displaying final message
})

