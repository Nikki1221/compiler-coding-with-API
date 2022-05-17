var startContainer =document.createElement("div");
startContainer.setAttribute("id","S_Container");
startContainer.setAttribute("class","S_Container");
document.body.appendChild(startContainer);



//Body-->startContainer-->Container
var container =document.createElement("div");
container.setAttribute("id","container");
startContainer.appendChild(container);

//Body-->startContainer-->Container-->Hedaing
var heading=document.createElement("h1");
heading.innerHTML="Write Your Code Here";
container.appendChild(heading);


/**
 * Drop Down
 * 
 */
var dropdown =document.createElement("select");
dropdown.setAttribute("name","LangType");
dropdown.setAttribute("id","langid");
container.appendChild(dropdown);

var option6=document.createElement("option");
dropdown.appendChild(option6);
option6.setAttribute("value","-1");
option6.innerHTML="Select language";

var option1=document.createElement("option");
dropdown.appendChild(option1);
option1.setAttribute("value","0");
option1.innerHTML="Python";

var option2=document.createElement("option");
dropdown.appendChild(option2);
option2.setAttribute("value","4");
option2.innerHTML="JavaScript";

var option3=document.createElement("option");
dropdown.appendChild(option3);
option3.setAttribute("value","7");
option3.innerHTML="C";

var option4=document.createElement("option");
dropdown.appendChild(option4);
option4.setAttribute("value","77");
option4.innerHTML="CPP";

var option5=document.createElement("option");
dropdown.appendChild(option5);
option5.setAttribute("value","77");
option5.innerHTML="Java";




/**
 * 
 * Textarea
 * 
 */
var textdiv=document.createElement("div");
container.appendChild(textdiv);
textdiv.setAttribute("id","textdiv");
textdiv.setAttribute("class","textdiv");

var textarea1=document.createElement("textarea");
textarea1.setAttribute("id","code");
textarea1.setAttribute("name","code");
textarea1.setAttribute("cols","150");
textarea1.setAttribute("rows","30");
textarea1.setAttribute("placeholder","Type your code");
textdiv.appendChild(textarea1);


var divbtn=document.createElement("div");
textdiv.appendChild(divbtn);
divbtn.setAttribute("id","divbtn");
var btn=document.createElement("button");
btn.innerHTML="Compile";
divbtn.appendChild(btn);
btn.setAttribute("id","btn");


var textarea2=document.createElement("textarea");
textarea2.setAttribute("name","output");
textarea2.setAttribute("id","output");
textarea2.setAttribute("cols","150");
textarea2.setAttribute("rows","6");
textdiv.appendChild(textarea2);


// get and post request

var outputConsole = document.getElementById("output");
var compile = document.getElementById("btn");
var codeWord = document.getElementById("code");
var lang= document.getElementById("langid");


// var id;
compile.addEventListener("click",givValue);

//langId.addEventListener("onclick",givValue());

function givValue() {
    // debugger;
    var option = lang.options[lang.selectedIndex];

    var data = {
        code: codeWord.value,
        langId: option.value
    };

    var request = new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    request.setRequestHeader("content-type","application/json");
    request.send(JSON.stringify(data));
    
    //console.log(JSON.stringify(data));
    

    request.addEventListener("load",function(e){
       var responseCodeId=JSON.parse(e.target.responseText);






      
    //debugger;
        setTimeout(getOutput(responseCodeId), 3000);
       
    });



    
}

function getOutput(resp){

    return function(){
        var request = new XMLHttpRequest();
    
        request.open("GET",`https://codequotient.com/api/codeResult/${resp.codeId}`);
        request.send();
    
        //console.log(resp);
        request.addEventListener("load",function(event){
            
            var getingData = JSON.parse(event.target.responseText);
            //console.log(getingData);
            console.log(getingData.data);
           var output = JSON.parse(getingData.data);
            if(output.errors=="")
            {
            console.log(output.output);
            outputConsole.innerHTML= output.output;

            }
            else{
                console.log(output.errors)
                outputConsole.innerHTML= output.errors;
            }
           // console.log(output);
        })
    
     }

}
