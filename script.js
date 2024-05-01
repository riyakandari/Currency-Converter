let baseURL = "https://latest.currency-api.pages.dev/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");

let btn = document.querySelector("form button");

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.id=== "from" && currCode === "USD") {
            newOption.selected = true;
        } else if(select.id === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
        // const markup = `<option>${currCode}</option`
        // select.insertAdjacentHTML("beforeend",markup)
    }

    select.addEventListener("change", (e) =>{
        updateFlag(e.target);
    })
}

const updateFlag = (el) => {
    let currCode = el.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = el.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (e)=> {
    e.preventDefault();
    let amount = document.querySelector("#amount");
    let amountVal = amount.value;
    if (amountVal < 1) {
        amountVal = 1;
        amount.value = 1;
    }
    let fromCurr = document.querySelector("#from").value;
    let toCurr = document.querySelector("#to").value;

    const URL = `${baseURL}/${fromCurr.toLowerCase()}.json`
    console.log(URL);

    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()].toFixed(2);
    console.log(rate);

    let finalAmount = amountVal * rate;

    let msg = document.querySelector(".msg");
    msg.innerText = `${amountVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
})
