import '../style/app.scss';

const temp = () => console.log('3473UUUU!!!');

temp();

function component() {
  const element = document.createElement('div');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello, webpack!!!';
  element.classList.add('hello');
  return element;
}

document.body.appendChild(component());
// function hello() {
//   let name = 'User'
//   alert(`Hello ${name}`)
// }

// hello()

// class Human {
//   constructor(name, age, salary) {
//     this.name = name
//     this.age = age
//     this.salary = salary
//     this.earned = 0;
//   }
//   sayHello(str = 'Hello') {
//     alert(str)
//   }
//   goWork() {
//     let hrs = this._ask();
//     this.earned = this._count(hrs);
//     this._resultWork();
//   }
//   _ask() {
//     return +prompt('Enter working time:')
//   }
//   _count(a) {
//     return this.salary * a
//   }
//   _resultWork() {
//     return console.log('TOTAL - ', this._count(this.earned));
//   }
// }
// let vas = new Human('Vasya', 20, 1000)
// let pet = new Human('Petya', 30, 1500)
// pet.goWork();