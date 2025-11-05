let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

window.speechSynthesis.onvoiceschanged = () => {
    let voices = window.speechSynthesis.getVoices();
    console.log("Available voices:", voices);
};

function speak(text)
{
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="en-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning")
    }
    else if(hours>=12 && hours<16){
        speak("Good Afternoon")
    }
    else{
        speak("Good Evening")
    }
}

window.addEventListener('load',()=>{
    wishMe()
})

let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;

if (!speechRecognition) {
    alert("Speech recognition is not supported in your browser. Please use Google Chrome or Microsoft Edge.");
} 
else
{
    let recognition =new speechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-GB"; 

    recognition.onstart = () => {
        content.innerText = "Listening...";
        btn.style.display = "none";
        voice.style.display = "block";
    };

    recognition.onend = () => {
        btn.style.display = "flex";
        voice.style.display = "none";
    };

    recognition.onresult = (event) => {
        let transcript = event.results[0][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    recognition.onerror = (event) => {
        content.innerText = "Error: " + event.error;
        console.error("Speech recognition error:", event.error);
        btn.style.display = "flex";
        voice.style.display = "none";
    };

// recognition.onresult=(event)=>{

//     let currentIndex=event.resultIndex
//     let transcript=event.results[currentIndex][0].transcript
//     content.innerText=transcript
//     takeCommand(transcript.toLowerCase())
// }

btn.addEventListener("click",()=>{
    recognition.start()
    // btn.style.display="none"
    // voice.style.display="block"
});

function takeCommand(message)
{
    // btn.style.display="flex"
    // voice.style.display="none"

    if(message.includes("hello") || message.includes("hey")){
        speak("hello mam,what can i help you?");
    }
    else if(message.includes("who are you")){
        speak("I am Sophie, your personal assistant.");
    }
    else if (message.includes("what are you doing")) {
        speak("I am just talking with you, mam.");
    }
    else if (message.includes("how are you")) {
        speak("I am doing great, thank you for asking. How are you?");
    }
    else if (message.includes("thank you")) {
        speak("You're welcome mam, happy to help.");
    }
    else if (message.includes("good night")) {
        speak("Good night mam, sweet dreams.");
    }
    else if (message.includes("good morning")) {
        speak("Good morning mam, hope you have a wonderful day ahead.");
    }
    else if(message.includes("open YouTube")){
        speak("opening YouTube..");
        window.open("https://www.youtube.com/","_blank");
    }
    else if(message.includes("open google")){
        speak("opening google..");
        window.open("https://www.google.com/","_blank");
    }
    else if(message.includes("open facebook")){
        speak("opening facebook..");
        window.open("https://www.facebook.com/","_blank");
    }
    else if(message.includes("open instagram")){
        speak("opening instagram..");
        window.open("https://www.instagram.com/","_blank");
    }
    else if(message.includes("open calculator")){
        speak("Sorry, calculator cannot be opened directly from browser.");
        window.open("calculator://");
    }
    else if(message.includes("time")){
     let time =new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
     speak(time);
    }
    else if (message.includes("bye") || message.includes("goodbye")) {
    speak("Goodbye mam, have a great day!");
    }

    else{
       let finalText="this is what i found on internet regarding" + message.replace("Sophie",""); //|| message.replace("Sophie","")
       speak(finalText);
       window.open(`https://www.google.com/search?q=${message.replace("Sophie","")}`,"_blank");
    }
}
}



       