// HTML form elements
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// HTML list elements
const expenseList = document.querySelector("aside ul");

/**
 * Input event listener
 *
 * @param {Event} event
 */
amount.oninput = (event) => {
  // Remove alpha characters
  let value = event.target.value.replace(/\D/g, "");

  // Convert to cents
  value = Number(value) / 100;

  event.target.value = formatCurrencyBRL(value);
};

/**
 * Format the currency amount into BRL pattern
 *
 * @param {string} value Value to format
 * @returns {string} Formatted value
 */
function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Form submit handler
 *
 * @param {SubmitEvent} event Submit event
 */
form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  addExpense(newExpense);
};

/**
 * Add a new expense to the list
 *
 * @param {any} newExpense Entered expense data
 */
function addExpense(newExpense) {
  try {
    const expenseHTMLItem = document.createElement("li");
    expenseHTMLItem.classList.add("expense");

    // Create category icon
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute(
      "src",
      `./assets/icons/${newExpense.category_id}.svg`
    );
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Create expense info
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Add expense name
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Add expense category name
    const expenseCategoryName = document.createElement("span");
    expenseCategoryName.textContent = newExpense.category_name;

    // Append info into div
    expenseInfo.append(expenseName, expenseCategoryName);

    // Create expense amount
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")
      .trim()}`;

    // Create expense delete button
    const expenseDeleteButton = document.createElement("img");
    expenseDeleteButton.classList.add("remove-icon");
    expenseDeleteButton.setAttribute("src", "./assets/icons/remove.svg");
    expenseDeleteButton.setAttribute("alt", "remove");

    // Add items info
    expenseHTMLItem.append(
      expenseIcon,
      expenseInfo,
      expenseAmount,
      expenseDeleteButton
    );

    // Add item into list
    expenseList.append(expenseHTMLItem);
  } catch (error) {
    alert("Error on update expense list");
    console.error(error);
  }
}
