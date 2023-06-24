let salaryAmount = parseInt(localStorage.getItem("salaryAmount")) || 0;
let dashboard = document.querySelector("#progress");
let summaryTable = document.querySelector("#table");
let tBody = document.querySelector("#t-body");
let transactions = [];

function renderTransactions(transactionData, rowIndex) {
  const transactionId = `transaction-${rowIndex}`;
  if (document.getElementById(transactionId)) {
    return;
  } else {
    const transaction = document.createElement("div");
    transaction.classList.add("transaction");
    transaction.id = `transaction-${transactionData.id}`;
    const tR = document.createElement("tr");
    tR.id = transactionId;
  
    const thIndex = document.createElement("th");
    const thTransaction = document.createElement("td");
    const thDescription = document.createElement("td");
    const thAmount = document.createElement("td");
    const tdButtons = document.createElement("td");
    const tdDelete = document.createElement("button");
    const tdEdit = document.createElement("button");
    thIndex.textContent = rowIndex +1;
    thIndex.setAttribute('scope', 'row')

    thTransaction.textContent = transactionData.title;
    thDescription.textContent = transactionData.description;
    thAmount.textContent = transactionData.amount;
    
    tdEdit.classList.add("delete-btn", "btn", "btn-dark");
    tdEdit.textContent = "Edit";
    tdEdit.setAttribute(
      "onclick",
      `generateEditForm('${transactionData.id}','${transactionData.title}','${transactionData.description}',${transactionData.amount})`
    );

    tdDelete.classList.add("delete-btn", "btn", "btn-dark");
    tdDelete.textContent = "Delete";
    tdDelete.setAttribute("onclick", `deleteTransaction(${transactionData.id}, ${rowIndex})`);
    tdButtons.append(tdEdit, tdDelete)
    tR.append(thIndex, thTransaction, thDescription, thAmount, tdButtons);
    tBody.append(tR);
  }
}

async function fetchTransactions() {
  tBody.innerHTML = "";
  transactions = await fetch("http://localhost:3000/transaction").then((res) => res.json());
  transactions.forEach((transaction, index) => renderTransactions(transaction, index));
  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  let percent = 0;
  if (salaryAmount !== 0) {
    percent = (((totalAmount * 100) / salaryAmount) / 100).toFixed(2);
    clearSalaryButton.hidden = false;
    salaryAmountNumber.textContent = localStorage.getItem("salaryAmount");
    salaryAmountInput.hidden = true;
    clearSalaryButton.hidden = false;
  } else {
    dashboard.style.display = "none";
    salaryAmountInput.hidden = false;
    clearSalaryButton.hidden = true;
  }
  circle.animate(percent);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchTransactions();
});

const form = document.querySelector("form");
const salaryAmountInput = document.querySelector("#salary-amount");
const clearSalaryButton = document.querySelector("#clear-salary");
const salaryAmountNumber = document.querySelector(".amount-number");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  if (salaryAmount === 0) {
    salaryAmount = parseInt(document.querySelector("#salary-amount").value);
    localStorage.setItem("salaryAmount", salaryAmount);
    salaryAmountInput.hidden = true;
    clearSalaryButton.hidden = false;
  }
  dashboard.style.display = "block";
  salaryAmountNumber.textContent = salaryAmountInput.value;
  const TransactionData = {
    title: document.querySelector("#title").value,
    description: document.querySelector("#description").value,
    amount: parseInt(document.querySelector("#amount").value),
  };
  const response = await fetch("http://localhost:3000/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(TransactionData),
  });
  const savedTransaction = await response.json();
  form.reset();
  renderTransactions(savedTransaction)
  fetchTransactions();
});

clearSalaryButton.addEventListener("click", (ev) => {
  ev.preventDefault();
  salaryAmount = 0;
  localStorage.removeItem("salaryAmount");
  salaryAmountInput.hidden = false;
  salaryAmountInput.value = "";
  clearSalaryButton.hidden = true;
  dashboard.style.display = "none";
  salaryAmountNumber.textContent = "0.00";
});

const circle = new ProgressBar.Circle("#progress", {
  color: "#6554AF",
  strokeWidth: 10,
  trailColor: "#f0f0f0",
  trailWidth: 10,
  duration: 2000,
  easing: "easeInOut",
});
async function deleteTransaction(identificador, rowIndex) {
  await fetch(`http://localhost:3000/transaction/${identificador}`, {
    method: "DELETE",
  });
  transactions.splice(rowIndex, 1);
  fetchTransactions();
}

const editForm = document.querySelector("#edit");
editForm.style.display = "none";
let editTitle = document.querySelector("#edit-title");
let editDescription = document.querySelector("#edit-description");
let editAmount = document.querySelector("#edit-amount");

let idEditTransaction;
function generateEditForm(id, title, description, amount) {
  editForm.style.display = "flex";
  editTitle.value = title;
  editDescription.value = description;
  editAmount.value = amount;
  idEditTransaction = id;
}

editForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const transactionUpdated = {
    title: editTitle.value,
    description: editDescription.value,
    amount: parseInt(editAmount.value),
  };
  editForm.style.display = "none";

  const response = await fetch(`http://localhost:3000/transaction/${idEditTransaction}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionUpdated),
  });
  const savedTransaction = await response.json();
  renderTransactions(savedTransaction)
  fetchTransactions();
});
