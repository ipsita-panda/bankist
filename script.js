'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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

let currentAccount;

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

const displayMovements = function (movement) {
  containerMovements.innerHTML = '';
  movement.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = ` <div class="movements__row">
    <div class="movements_type movements_type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(stringname => {
        return stringname[0];
      })
      .join('');
  });
};

createUserName(accounts);

const displayTotalMoney = function (movement) {
  return movement.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
};

const displayIncomes = function (acc) {
  const incomes = acc.movements
    .filter(function (mov) {
      if (mov > 0) return mov;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `${incomes} EUR`;
  const out = acc.movements
    .filter(function (mov) {
      if (mov < 0) return mov;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumOut.textContent = `${Math.abs(out)} EUR`;

  const interest = acc.movements
    .filter(function (mov) {
      if (mov > 0) return mov;
    })
    .map(function (mov) {
      return (mov * acc.interestRate) / 100;
    })
    .filter(function (int) {
      return int >= 1;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
  labelSumInterest.textContent = `${interest} EUR`;
};

//////////////////////////////////////////////////////////////
//event listeners

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  accounts.find(function (acc) {
    if (
      acc.userName === inputLoginUsername.value &&
      acc.pin == inputLoginPin.value
    ) {
      currentAccount = acc;
      labelWelcome.textContent = `Welcome back ${acc.owner.split(' ')[0]}`;
      containerApp.style.opacity = 100;
      displayIncomes(acc);
      displayMovements(acc.movements);
      labelBalance.textContent = `${displayTotalMoney(acc.movements)} EUR`;
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();
    }
  });
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const findReceieverAccount = amount => {
    accounts.find(acc => {
      if (acc.userName === inputTransferTo.value) {
        acc.movements.push(amount);
      }
    });
  };

  accounts.find(function (acc) {
    if (
      acc.userName === currentAccount.userName &&
      Number(displayTotalMoney(acc.movements)) > 0 &&
      Number(displayTotalMoney(acc.movements)) > amount
    ) {
      acc.movements.push(-amount);
      findReceieverAccount(amount);
      displayMovements(acc.movements);
      displayIncomes(acc);
      labelBalance.textContent = `${displayTotalMoney(acc.movements)} EUR`;
    }
  });
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  console.log(currentAccount);
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.userName === currentAccount.userName;
    });
    console.log(index);
    //Delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`you have deposited ${movement}`);
//   } else {
//     console.log(`you have withdrawn ${Math.abs(movement)}`);
//   }
// }

///////////////////////////////////////////////////////////////////
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`you have deposited ${movement}`);
//   } else {
//     console.log(`you have withdrawn ${Math.abs(movement)}`);
//   }
// });
// const eurToUsd = 1.1;
// const movementsUSD = movements.map(mov => {
//   return mov * eurToUsd;
// });
// ///////////////////////////////////////////////////////////
// console.log(movements);
// console.log(movementsUSD);

// for (const mov of movements) {
//   return mov * eurToUsd;
// }
// console.log(movements);
/////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////

// const deposits = movements.filter(function (mov) {
//   const deposit = mov > 0;
//   return deposit;
// });

// console.log(deposits);

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   return acc + cur;
// }, 0);
// console.log(balance);

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages �)
// 4. Run the function for both test datasets
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// const data1 = [5, 2, 4, 1, 15, 8, 3];
// const data2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(function (dogAge) {
//     if (dogAge < 2 || dogAge == 2) return 2 * dogAge;
//     else return 16 + dogAge * 4;
//   });
//   return humanAge;
// };
// const humanAge = calcAverageHumanAge(data1);
// calcAverageHumanAge(data2);

// const excludeDogs = function (ages) {
//   const filteredArray = ages.filter(function (age) {
//     return age > 18;
//   });
//   console.log(filteredArray);
// };
// console.log(humanAge, 'human age');
// excludeDogs(humanAge)
