const BASE_url="https://www.googleapis.com/youtube/v3";

const API_KEY="AIzaSyBYk4XQpMkC1wLrtzJqLoSTJhx7zj3k8sc";

const CONTENT_DETAILS='contentDetails'
const STATS='statistics'

var menuIcon=document.querySelector(".menu-icon");
var sideBar=document.querySelector(".sidebar");
var containerdiv=document.querySelector(".container")
var listContainer=document.querySelector(".list-container");
const toogleBut=document.getElementById("toogleMode");
const navbar=document.querySelector("#navbar");

menuIcon.addEventListener("click",hideSideBar);
function hideSideBar(){
    sideBar.classList.toggle("small-sidebar")
}
window.addEventListener("DOMContentLoaded",()=>{
    const data=fetchVideos("",20);
    data.then((value)=>{
        console.log(value.items[0].snippet.channelTitle);
        console.log(value.items[0].snippet.title);
        for(let i=0;i<value.items.length;i++){
            let newDiv=document.createElement("div");
            newDiv.className="vid-list";
            
            newDiv.innerHTML=`<img src="${value.items[i].snippet.thumbnails.default.url}" class="thumbnail">
                              <div class="flex-div">
                                   <img src="${value.items[i].snippet.thumbnails.high.url}">
                                   <div class="vid-info">
                                       <a href="">${value.items[0].snippet.title}</a>
                                       <p>${value.items[i].snippet.channelTitle}</p>
                                       <p></p>   
                                   </div>
                              </div>`
            listContainer.appendChild(newDiv)                  
        }
    })
})
async function fetchVideos(searchQuery,maxResults){
    try{
    const response=await fetch(BASE_url+'/search'+`?key=${API_KEY}&part=snippet`+`&q=${searchQuery}`+`&maxResults=${maxResults}`)
    const data=await response.json();
    return data;
    }
    catch(err){
        console.log(err);
    }
}

async function fetchVideoStats(videoId,typeOfDetails){
    const response=await fetch(BASE_url+"/videos"+ `?key=${API_KEY}`+`&part=${typeOfDetails}`+`&id=${videoId}`);
    const data=await response.json();
    console.log(data);
}
async function fetchLogo(channelId){
    const response=await fetch(BASE_url+'/channels'+`?key=${API_KEY}&part=snippet`+`&id=${channelId}`)
    const data=await response.json();
    console.log(data);
}