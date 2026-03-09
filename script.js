let allIssues=[]

function login(){

let u=username.value
let p=password.value

if(u==="admin" && p==="admin123"){

loginPage.classList.add("hidden")
mainPage.classList.remove("hidden")

loadIssues()

}else{

alert("Wrong credential")

}

}



async function loadIssues(){

showLoader()

let res=await fetch(
"https://phi-lab-server.vercel.app/api/v1/lab/issues"
)

let data=await res.json()

allIssues=data.data

displayIssues(allIssues)

hideLoader()

}

function changeTab(type,btn){

document.querySelectorAll(".tab")
.forEach(t=>t.classList.remove("active"))

btn.classList.add("active")

if(type==="all") displayIssues(allIssues)

if(type==="open"){

let list=allIssues.filter(
i=>i.status==="open"
)

displayIssues(list)

}

if(type==="closed"){

let list=allIssues.filter(
i=>i.status==="closed"
)

displayIssues(list)

}

}



function displayIssues(list){

issuesContainer.innerHTML=""

issueCount.innerText=list.length+" Issues"

list.forEach(issue=>{

let card=document.createElement("div")

card.className="card "+issue.status


let statusIcon=`
<div class="status-icon status-open">
<i class="fa-solid fa-check"></i>
</div>
`

if(issue.status==="closed"){

statusIcon=`
<div class="status-icon status-closed">
<i class="fa-solid fa-xmark"></i>
</div>
`

}


let priorityClass="priority-low"
let priorityIcon="fa-arrow-down"

if(issue.priority==="HIGH"){

priorityClass="priority-high"
priorityIcon="fa-arrow-up"

}

if(issue.priority==="MEDIUM"){

priorityClass="priority-medium"
priorityIcon="fa-minus"

}


card.innerHTML=`

<div class="flex justify-between mb-3">

${statusIcon}

<span class="priority ${priorityClass}">
<i class="fa-solid ${priorityIcon}"></i>
${issue.priority}
</span>

</div>

<h4 class="font-semibold mb-2">
${issue.title}
</h4>

<p class="text-gray-500 text-sm">
${issue.description}
</p>

<div class="mt-3 flex gap-2">

<span class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
BUG
</span>

<span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
HELP WANTED
</span>

</div>

<p class="text-gray-400 text-xs mt-3">
# by ${issue.author}
</p>

<p class="text-gray-400 text-xs">
${issue.createdAt}
</p>

`

card.onclick=()=>openModal(issue.id)

issuesContainer.appendChild(card)

})

}



async function openModal(id){

let res=await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

let data=await res.json()

let i=data.data

modal.style.display="block"

mTitle.innerText=i.title
mDesc.innerText=i.description
mAuthor.innerText=i.author
mPriority.innerText=i.priority
mStatus.innerText=i.status
mLabel.innerText=i.label
mDate.innerText=i.createdAt

}



function closeModal(){
modal.style.display="none"
}



async function searchIssue(){

let text=searchInput.value

let res=await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)

let data=await res.json()

displayIssues(data.data)

}



function showLoader(){
loader.style.display="block"
}

function hideLoader(){
loader.style.display="none"

}
