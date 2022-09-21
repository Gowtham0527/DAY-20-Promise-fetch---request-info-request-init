function verifyNum(){
const number = document.getElementById("mobile-num").value;

//send api and number to verify mobile number
fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${API}&phone=${number}`)
.then(response => response.json())
.then(data => {
    if(data.valid){
        console.log(JSON.stringify(data));
        //display verified text next to number if number is valid
        document.getElementsByClassName("verify-success-text")[0].style.display="block";

        document.getElementsByClassName("number-location")[0].innerText=`Mobile number's location - ${data.location}`;
        document.getElementsByClassName("number-location")[0].style.display="block";
    }
    else{
        //display Invalid text next to number if validation failed
        document.getElementsByClassName("verify-failure-text")[0].style.display="block";
        //get the country code
        let code= data.country.prefix;
        //get the entered phone number length
        let number = data.phone.length;

        //display error message if country code is missing or number is less than 10
        if(code === "" || number < 10){
            document.getElementsByClassName("errorMessage")[0].innerText = "Missing country code/Invalid mobile number. Symbols/special characters not allowed.";
            document.getElementsByClassName("errorMessage")[0].style.display="block";
        }
    }
})
.catch(error => {
    console.log(JSON.stringify(error));
    window.open("http://127.0.0.1:5500/error.html","_blank");
});
}

function handle(event){
    event.preventDefault();
    //clear all error messages
    document.getElementsByClassName("verify-success-text")[0].style.display="none";
    document.getElementsByClassName("verify-failure-text")[0].style.display="none";
    document.getElementsByClassName("errorMessage")[0].style.display="none";
    document.getElementsByClassName("number-location")[0].style.display="none";
}
 13 