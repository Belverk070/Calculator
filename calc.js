let firstValue = ""
let secondValue = ""
let operationSign = ""
let isFinished = false
let isPercentPressed = false
let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
let actions = ["+", "-", "/", "*", "+/-", "%"]

let output = document.querySelector(".calculator__input__window")

function clearAll() {
	firstValue = ""
	secondValue = ""
	operationSign = ""
	isFinished = false
	isPercentPressed = false
	output.textContent = 0
}

document.querySelector(".clear").onclick = clearAll

document.querySelector(".calculator__buttons").onclick = (event) => {
	if (!event.target.classList.contains("button")) return
	if (event.target.classList.contains("clear")) return

	output.textContent = ""

	const pressedKey = event.target.textContent

	if (digits.includes(pressedKey)) {
		if (secondValue === "" && operationSign === "") {
			firstValue += pressedKey
			output.textContent = firstValue
		} else if (firstValue !== "" && secondValue !== "" && isFinished) {
			secondValue = pressedKey
			isFinished = false
			output.textContent = secondValue
		} else {
			secondValue += pressedKey
			output.textContent = secondValue
			if (isPercentPressed === true) {
				secondValue += pressedKey
				output.textContent = secondValue / 100
			}
		}
		return
	}

	if (actions.includes(pressedKey)) {
		if (pressedKey === "+/-") {
			firstValue *= -1
			output.textContent = firstValue
		} else if (pressedKey === "%") {
			isPercentPressed = true
			output.textContent = "%"
		} else {
			operationSign = pressedKey
			output.textContent = operationSign
			return
		}
	}

	if (pressedKey == "=") {
		if (secondValue === "") secondValue = firstValue
		switch (operationSign) {
			case "+":
				isPercentPressed
					? (firstValue = +firstValue + (firstValue / 100) * secondValue)
					: (firstValue = +firstValue + +secondValue)
				break
			case "-":
				isPercentPressed
					? (firstValue = +firstValue - (firstValue / 100) * secondValue)
					: (firstValue = firstValue - secondValue)
				break
			case "*":
				isPercentPressed
					? (firstValue = (firstValue / 100) * secondValue)
					: (firstValue = firstValue * secondValue)
				break
			case "/":
				if (secondValue === "0") {
					output.textContent = "Ошибка"
					firstValue = ""
					secondValue = ""
					operationSign = ""
					return
				}
				firstValue = firstValue / secondValue
				break
		}
		isFinished = true
		isPercentPressed = false
		output.textContent = firstValue
	}
}
