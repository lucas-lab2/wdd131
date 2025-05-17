const input = document.querySelector('#favchap');
const button = document.querySelector( 'button');
const list = document.querySelector('__________'); // you need to fill in the blank to

const li = document.createElement('li');
const deleteButton = document.createElement('button');

li.textContent = input.value;

deleteButton.textContent = '❌';

li.appendChild(deleteButton);
list.append(li);