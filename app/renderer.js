const {clipboard, shell, ipcRenderer} = require('electron');
const application = document.getElementById('application');
const unpackedItemsList = document.getElementById('unpacked-items');
const packedItemsList = document.getElementById('packed-items');
const addItemButton = document.querySelector('#addItem');
const inputItem = document.getElementById('inputItem');
const items = []
const unpackedItems = []

var no = 1;
const packedItems = []
const createItemElement = (itemName) => {
	const itemElement = document.createElement('div');
	itemElement.classList.add('item-list-item');
	itemElement.innerHTML = `
		<div class ="item">
			<input type ="checkbox" class = "unpackeditem" name = "itemCheckBox" id = "${items.indexOf(itemName)}" value ="${itemName}">
			<label>${itemName}</label>
		</div>
		`
	return itemElement;
}


const addPackedItemElement = (itemName) => {
	const itemElement = document.createElement('div');
	itemElement.classList.add('item-list-item');
	itemElement.innerHTML = `
		<div class ="item">
			<input type ="checkbox" class = "packeditem" checked ="checked" name = "packedItemCheckBox" id = "${items.indexOf(itemName)}" value ="${itemName}">
			<label>${itemName}</label>
		</div>
		`
	return itemElement;
}

const addItemToList = (itemName) => {
	items.push(itemName);
	addItemToUnpackedList(itemName);
}

const addItemToUnpackedList = (itemName) => {
	unpackedItems.push(itemName);
	packedItems.splice(packedItems.indexOf(itemName));
	const itemElement = createItemElement(itemName);
	unpackedItemsList.append(itemElement);
}

const addItemToPackedList = (itemName) => {
	packedItems.push(itemName);
	unpackedItems.splice(unpackedItems.indexOf(itemName));
	const itemElement = addPackedItemElement(itemName);
	packedItemsList.append(itemElement);
	console.log(packedItems);
}

addItemButton.addEventListener('click', () => {
	const value = inputItem.value.trim();
	if(value != '' && value != null){
		const itemName = addItemToList(value);
		console.log(value);
		inputItem.value = '';
	}
});

application.addEventListener('click', (event) => {
	const hasClass = className => {
		return event.target.classList.contains(className);
	}
	const itemListItem = getButtonParent(event);
	if(hasClass('unpackeditem')) console.log(event.target.value, checkItem(itemListItem, event.target.value));
	if(hasClass('packeditem')) console.log('unchecked', uncheckItem(itemListItem, event.target.value));
	
})
const getButtonParent = ({target}) => {
	return target.parentNode.parentNode;
}

const checkItem = (target, value) => {
	target.remove();
	addItemToPackedList(value);
}
const uncheckItem = (target, value) => {
	target.remove();
	addItemToUnpackedList(value);
}
