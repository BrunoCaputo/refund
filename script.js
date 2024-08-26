// HTML form selections
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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
};
