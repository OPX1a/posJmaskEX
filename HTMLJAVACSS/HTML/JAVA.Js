class Task {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

function createTaskManager() {
  let tasks = [];

  return {
    addTask: function(title) {
      const newTask = new Task(Date.now(), title);
      tasks.push(newTask);
      return newTask;
    },
    deleteTask: function(id) {
      tasks = tasks.filter(task => task.id !== id);
    },
    getTask: function(id) {
      return tasks.find(task => task.id === id);
    },
    getAllTasks: function() {
      return tasks;
    }
  };
}

const taskManager = createTaskManager();

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const btcAmountInput = document.getElementById('btc-amount');
const priceResult = document.getElementById('price-result');

let realBtcToUSD = 0;
let realBtcToTHB = 0;
let estimatedBtcToLAK = 0;

function renderTasks() {
  taskList.innerHTML = '';

  taskManager.getAllTasks().forEach(task => {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = task.title;
    if (task.completed) {
      span.classList.add('completed');
    }

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.addEventListener('click', () => {
      task.toggleComplete();
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      taskManager.deleteTask(task.id);
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text !== '') {
    taskManager.addTask(text);
    taskInput.value = '';
    renderTasks();
  }
});

function calculateAndDisplay() {
  const btcValue = parseFloat(btcAmountInput.value) || 0;
  
  const totalUSD = btcValue * realBtcToUSD;
  const totalTHB = btcValue * realBtcToTHB;
  const totalLAK = btcValue * estimatedBtcToLAK;

  priceResult.innerHTML = `
    <strong>${btcValue} BTC =</strong><br>
    🇺🇸 USD: <strong>$${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><br>
    🇹🇭 THB: <strong>${totalTHB.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> Baht<br>
    🇱🇦 LAK: <strong>${totalLAK.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> Kip
  `;
}

async function fetchBitcoinPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,thb');
    
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();

    realBtcToUSD = data.bitcoin.usd;
    realBtcToTHB = data.bitcoin.thb;

    estimatedBtcToLAK = realBtcToTHB * 660; 

    calculateAndDisplay();
  } catch (error) {
    console.error('Error fetching prices:', error);
    priceResult.innerHTML = `<span style="color: red;">Failed to load live rates. Please try again.</span>`;
  }
}

btcAmountInput.addEventListener('input', calculateAndDisplay);

fetchBitcoinPrice();