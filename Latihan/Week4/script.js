let runningTotal = 0 // total / hasil dari operasi
let buffer = '0' // tampung angka yang diklik
let previousOperator // opertor yang digunakan

// layar screen untuk menampilkan hasil
const screen = document.querySelector('.screen')

// fungsi untuk menampilkan angka ke screen
function rerender() {
  screen.innerText = buffer
}

// fungsi untuk menambahkan event listener ke dalam button
function init() {
  document
    .querySelector('.calc-buttons')
    .addEventListener('click', function (event) {
      // panggil fungsi buttonClick dengan parameter nilai yang diklik
      buttonClick(event.target.innerText)
    })
}

// menjalankan fungsi init
init()

// fungsi untuk handle button yang diklik
function buttonClick(value) {
  // jika value bukan angka
  if (isNaN(parseInt(value))) {
    handleSymbol(value)
  } else {
    handleNumber(value)
  }
  rerender()
}

// fungsi untuk menghandle angka yang diklik
function handleNumber(value) {
  if (buffer === '0') {
    buffer = value
  } else {
    buffer += value
  }
}

function handleMath(value) {
  if (buffer === '0') {
    // do nothing
    return
  }

  const intBuffer = parseInt(buffer)
  if (runningTotal === 0) {
    runningTotal = intBuffer
  } else {
    flushOperation(intBuffer)
  }

  previousOperator = value

  buffer = '0'
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer
  } else if (previousOperator === '-') {
    runningTotal -= intBuffer
  } else if (previousOperator === '×') {
    runningTotal *= intBuffer
  } else {
    runningTotal /= intBuffer
  }
}

function handleSymbol(value) { 
  switch (value) {
    case 'C':
      buffer = '0'
      runningTotal = 0
      break
    case '=':
      if (previousOperator === null) {
        // need two numbers to do math
        return
      }
      prevRunningTotal = runningTotal

      flushOperation(parseInt(buffer))
      
      addHistory()    
  
      previousOperator = null
      buffer = runningTotal
      runningTotal = 0
      break
    case '←':
      if (buffer.length === 1) {
        buffer = '0'
      } else {
        buffer = buffer.substring(0, buffer.length - 1)
      }
      break
    case '+':
    case '-':
    case '×':
    case '÷':
      handleMath(value)
      break
  }

  function addHistory() {
    const ul = document.getElementById('history')
    const li = document.createElement('li')
    li.appendChild(
      document.createTextNode(
        `${prevRunningTotal} ${previousOperator} ${buffer} = ${runningTotal} `
      )
    )
    ul.appendChild(li)
  }
}
