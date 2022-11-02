let a = ""
let b = ""
let sign = ""
let finish = false
let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
let actions = ["+", "-", "/", "*"]

let output = document.querySelector(".calculator__input__window")

function clearAll() {
	a = ""
	b = ""
	sign = ""
	finish = false
	output.textContent = 0
}

document.querySelector(".clear").onclick = clearAll

document.querySelector(".calculator__buttons").onclick = (event) => {
	if (!event.target.classList.contains("button")) return
	if (event.target.classList.contains("clear")) return

	output.textContent = ""

	const key = event.target.textContent

	if (digits.includes(key)) {
		if (b === "" && sign === "") {
			a += key
			output.textContent = a
		} else if (a !== "" && b !== "" && finish) {
			b = key
			finish = false
			output.textContent = b
		} else {
			b += key
			output.textContent = b
		}
		return
	}

	if (actions.includes(key)) {
		sign = key
		output.textContent = sign
		return
	}

	if (key == "=") {
		if (b === "") b = a
		switch (sign) {
			case "+":
				a = +a + +b
				break
			case "-":
				a = a - b
				break
			case "*":
				a = a * b
				break
			case "/":
				if (b === "0") {
					output.textContent = "Ошибка"
					a = ""
					b = ""
					sign = ""
					return
				}
				a = a / b
				break
		}
		finish = true
		output.textContent = a
	}
}
