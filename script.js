// HTML form elements
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// HTML list elements
const expenseList = document.querySelector("aside ul");
const expenseQuantity = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");

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
 * @param {number} value Value to format
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

    updateTotals();
  } catch (error) {
    alert("Error on update expense list");
    console.error(error);
  }
}

/**
 * Update total expenses and amount
 */
function updateTotals() {
  try {
    const items = expenseList.children;
    const itemsQuantity = items.length;

    expenseQuantity.textContent = `${itemsQuantity} ${
      itemsQuantity > 1 ? "despesas" : "despesa"
    }`;

    let totalExpense = 0;

    for (let item = 0; item < itemsQuantity; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      value = parseFloat(value);

      if (isNaN(value)) {
        return alert(
          "Error on calculate expense total amount. The value is not a number"
        );
      }

      totalExpense += Number(value);
    }

    expenseTotal.innerHTML = `<small>R$</small>${formatCurrencyBRL(totalExpense)
      .toUpperCase()
      .replace("R$", "")
      .trim()}`;
  } catch (error) {
    alert("Error on update totals");
    console.error(error);
  }
}

// List item click event listener
expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-icon")) {
    // Remove parent
    const item = event.target.closest(".expense");
    item.remove();
  }

  updateTotals();
});
