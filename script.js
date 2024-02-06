function calculatePositionSize() {
  var usdAmount = parseFloat(document.getElementById('usdAmount').value);
  var stopLossPercentage = parseFloat(document.getElementById('stopLossPercentage').value);
  var riskToRewardRatio = parseFloat(document.getElementById('riskToRewardRatio').value);
  var positionType = document.getElementById('positionType').value;
  var currentPrice = parseFloat(document.getElementById('currentPrice').value);

  if (isNaN(usdAmount) || isNaN(stopLossPercentage) || isNaN(riskToRewardRatio) || isNaN(currentPrice)) {
      displayResult("Please enter valid numerical values for all fields.");
      return;
  }

  // Convert stop loss percentage to an absolute value
  var stopLossAmount = currentPrice * (stopLossPercentage / 100);

  var positionSize = usdAmount / stopLossAmount;
  var targetProfit = riskToRewardRatio * stopLossAmount;

  var stopLoss = positionType === 'long' ? currentPrice - stopLossAmount : currentPrice + stopLossAmount;
  var close10Percent = currentPrice + (0.1 * targetProfit);
  var close80Percent = currentPrice + (0.8 * targetProfit);

  displayResult([
    `Stop Loss: ${stopLoss.toFixed(4)}`,
    `Close 10% Profit: ${close10Percent.toFixed(4)}`,
    `Close 80% Profit: ${close80Percent.toFixed(4)}`
]);
}

function displayResult(results) {
  var resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
      resultContainer.textContent = "Error: " + message;
      return;
  }

  var resultList = document.createElement('ul');

  results.forEach(function(result) {
      var listItem = document.createElement('li');
      listItem.textContent = result;
      resultList.appendChild(listItem);
  });

  resultContainer.appendChild(resultList);
}
