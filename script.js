function displayResult(results) {
  var resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    resultContainer.textContent = "Error: " + message;
    return;
  }

  var resultList = document.createElement("ul");

  results.forEach(function (result) {
    var listItem = document.createElement("li");
    listItem.textContent = result;
    resultList.appendChild(listItem);
  });

  resultContainer.appendChild(resultList);
}

function calculatePositionSize() {
  var usdAmount = parseFloat(document.getElementById("usdAmount").value);
    var stopLossPercentage = parseFloat(document.getElementById("stopLossPercentage").value);
    var riskToRewardRatio = parseFloat(document.getElementById("riskToRewardRatio").value);
    var positionType = document.getElementById("positionType").value;
    var currentPrice = parseFloat(document.getElementById("currentPrice").value);
    var stopValue = parseFloat(document.getElementById("stopValue").value); // Add this line

    if (isNaN(usdAmount) || isNaN(stopLossPercentage) || isNaN(riskToRewardRatio) || isNaN(currentPrice) || isNaN(stopValue)) {
        displayResult(["Please enter valid numerical values for all fields."]);
        return;
    }


  // Convert stop loss percentage to an absolute value
  var stopLossAmount = currentPrice * (stopLossPercentage / 100);

  // Adjust stopLoss direction based on position type
  var stopLoss =
    positionType === "long"
      ? currentPrice - stopLossAmount
      : currentPrice + stopLossAmount;
  var targetProfit = riskToRewardRatio * stopLossAmount;

  // Adjust close profits based on position type
  var close10Percent =
    positionType === "long"
      ? currentPrice + 0.1 * targetProfit
      : currentPrice - 0.1 * targetProfit;
  var close80Percent =
    positionType === "long"
      ? currentPrice + 0.8 * targetProfit
      : currentPrice - 0.8 * targetProfit;

  var positionSize = usdAmount / stopLossAmount;

  displayResult([
    `Stop Loss: ${stopLoss.toFixed(4)}`,
    `Close 10% Profit: ${close10Percent.toFixed(4)}`,
    `Close 80% Profit: ${close80Percent.toFixed(4)}`,
    `Position Size: ${positionSize.toFixed(4)} units`, // Display the position size in units
]);
}
