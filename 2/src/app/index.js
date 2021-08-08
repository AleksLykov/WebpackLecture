import '../style/app.scss';

const temp = () => console.log('egrhetjrytemr!!!');
console.log('API_KEY - ', API_KEY);

temp();

function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Hello, webpack';
  element.classList.add('hello');
  return element;
}

document.body.appendChild(component());