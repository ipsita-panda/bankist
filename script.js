'use strict';
// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

/////////////////////////////////////////////////
///////////////////
//////////////////
// //SLICE METHOD(doesn't change the original array)
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4)); //last index is not taken
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); //copy of the original array
// console.log([...arr]); //same as above

// //SPLICE METHOD(mutates the original array)
// //console.log(arr.splice(2));
// console.log(arr.splice(1, 2)); //read MDN doc //unlike slice,splice deletes 2 elements starting from index 1
// //2nd arguement in splice method is the number of elements to be deleted
// console.log(arr);

// //REVERSE(mutates the original array)
// arr = ['a', 'b', 'c', 'd', 'e'];
// arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());

// //CONCAT(doesn't change the original array)
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]); //same as concat

// //JOIN
// console.log(letters.join('-'));

//////////////////////////////////////////////////////////
/////////////////
////////////////////
//AT METHOD

// const arr = [23, 11, 64];
// console.log(arr.at(0));
// console.log(arr[0]); //same as above

// //getting the last element
// console.log(...arr.slice(-1));
// console.log(arr.slice(-1)[0]);
// console.log(arr[arr.length - 1]);
// console.log(arr.at(-1));
// //AT METHOD is also applicable for strings
// const myName = 'ipsita';
// console.log(myName.at(0));

//////////////////////////////////////////////////////////////
/////////////////
/////////////
//LOOPING USING FOREACH
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //(for of loop)
// for (movement of movements) {
//   if (movement > 0) console.log(`you deposited ${movement}`);
//   else console.log(`you withdrew ${Math.abs(movement)}`);
// }
// console.log('---------------------------------------------------');
// // forEach method(it is a higher order function as it is given a callback function)
// movements.forEach(function (movement, index) {
//   if (movement > 0)
//     console.log(`movement ${index + 1}. you deposited ${movement}`);
//   else console.log(`movement ${index}. you withdrew ${Math.abs(movement)}`);
// });

//////////////////////////////////////////////////////////
/////////////////////////////////////
//////////////////////////
//forEach WITH MAPS(KEY VALUE PAIR OF ANY DATA TYPE)
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

//forEach WITH SETS(COLLECTION OF UNIQUE VALUES)
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, key) {
//   console.log(`${key} : ${value}`);
// });
//in sets values is equal to keys as there is no keys
/////////////////////////////////////
///////////////////////////////
//////////////////////////////
//////////////////////////////////////////
//////////////////////////////////
/////////////////////////////////
////////////////////////////////////
////////////////////////////////////

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  console.log(movements);
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    
    <div class="movements__value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
