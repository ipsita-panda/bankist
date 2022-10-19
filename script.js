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

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
  ],
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? movements.slice().sort(function (a, b) {
        return a - b;
      })
    : movements;
  movs.forEach(function (mov, i) {
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

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if (
    loan > 0 &&
    currentAccount.movements.some(function (mov) {
      return mov >= loan * 0.1;
    })
  ) {
    //Add movement
    currentAccount.movements.push(loan);

    //add movement
    displayMovements(currentAccount.movements);
    displayIncomes(currentAccount);
  }

  inputLoanAmount.value = '';
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

//sort button
let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
