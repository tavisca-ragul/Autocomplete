const nameList = [
	"Ragul", 
	"Rajpreet", 
	"Pallvi", 
	"Neha", 
	"Ankita", 
	"Raja", 
	"Shreea", 
	"Smriti", 
	"Shrijeet", 
	"Ayush", 
	"Swapnil", 
	"Nihit", 
	"Bhargavi", 
	"Anushka", 
	"Swinal", 
	"Utkarsh", 
	"Saurabh", 
	"Paarth", 
	"Vishwas", 
	"Mohit", 
	"Gurbaksh", 
	"Ashwarya"
];

const nameSuggestions = {
	actionurl: "nameSuggestions",
	name: {
		actionurl: "name",
		pattern: null,
		value: "",
		input: (args) => {
			nameSuggestions.name.value = args.target.value;
			nameSuggestions.name.pattern = new RegExp(nameSuggestions.name.value, 'i');
			let ulElement = document.getElementById(nameSuggestions.actionurl);
			ulElement.innerText = "";
			if(nameSuggestions.name.value === "")
				return;
			for(let list of nameList) {
				if(list.toLowerCase().match(nameSuggestions.name.pattern)) {
					let liElement = document.createElement("li");
					liElement.setAttribute("id", list);
					liElement.innerText = list;
					ulElement.appendChild(liElement);
					document.getElementById(list).addEventListener("click", nameSuggestions.name.action);
				}
			}
			if(!ulElement.hasChildNodes()) {
				let liElement = document.createElement("li");
				liElement.setAttribute("id", "listMessage");
				liElement.innerText = "No names found";
				ulElement.appendChild(liElement);
			}
		},
		action: (args) => {
			let nameElement = document.getElementById(nameSuggestions.name.actionurl);
			nameSuggestions.name.value = args.target.innerText;
			nameElement.value = nameSuggestions.name.value;
			let ulElement = document.getElementById(nameSuggestions.actionurl);
			ulElement.innerText = "";
		}
	}
};

const closeElements = {
	nameInputHolder: {
		actionurl: "nameInputHolder",
		action: (args) => {
			if(args.target.id !== "") {
				let clickedElement = document.getElementById(args.target.id);
				let nameInputHolder = document.getElementById(closeElements.nameInputHolder.actionurl);
				if(clickedElement.parentNode !== nameInputHolder)
					document.getElementById(nameSuggestions.actionurl).style.display = "none";
			} else 
				document.getElementById(nameSuggestions.actionurl).style.display = "none";
		}
	},
	nameInput: {
		actionurl: "name",
		action: (args) => {
			if(args.target.id !== "") {
				let clickedElement = document.getElementById(args.target.id);
				let nameInput = document.getElementById(closeElements.nameInput.actionurl);
				if(clickedElement === nameInput)
					document.getElementById(nameSuggestions.actionurl).style.display = "block";
			}
		}
	}
};

function loadEvents() {
	let elem;
	if(document.getElementById(nameSuggestions.name.actionurl) !== null) {
		elem = document.getElementById(nameSuggestions.name.actionurl);
		elem.addEventListener("input", nameSuggestions.name.input);
	}
}

function closeEvents(args) {
	let elem;
	if(document.getElementById(closeElements.nameInputHolder.actionurl) !== null)
		closeElements.nameInputHolder.action(args);

	if(document.getElementById(closeElements.nameInput.actionurl) !== null)
		closeElements.nameInput.action(args);
}

window.addEventListener("load", loadEvents);
window.addEventListener("click", closeEvents);