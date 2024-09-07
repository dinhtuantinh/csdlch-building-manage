// File utils.js
function calculateServiceCost(usage, currentDate) {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const usedDays = Math.ceil(
    (currentDate - usage.registeredDate) / (1000 * 60 * 60 * 24)
  );

  return (usedDays / daysInMonth) * usage.unitPrice;
}

module.exports = {
  calculateServiceCost,
};
