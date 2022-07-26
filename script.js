function clearPizzaSelections(pizzas) {
    let k;
    for (k = 0; k < pizzas.length; k++) {
        if (pizzas[k].classList.contains("pizza-selected")) {
            pizzas[k].classList.remove("pizza-selected");
        }
    }
}

function closeColl(content, image) {
    if (content.id === "alc") resetQtys();
    content.style.maxHeight = null;
    clearPizzaSelections(pizzas);
    image.setAttribute("style","background-image:url(\"/images/chevron-down.svg\")");
}

function decrement(qty) {
    let x = qty.innerText;
    if (x !== "0") {
        x--;
        qty.innerText = x;
    }
}

function displayList() {
    // Reset by removing what is already being displayed
    for (let i = 0; i < document.getElementById("order-list").children.length; i++) {
        document.getElementById("order-list").children[i].remove();
    }
    // Add everything to the parent div one at a time
    for (let i = 0; i < order_all.sc.length; i++) {
        let div = document.createElement("div");
        div.classList.add("order-border");
        div.classList.add("order-list-item");
        div.innerHTML = "sc-test #" + i;
        document.getElementById("order-list").appendChild(div);
    }
}

function gotoCheckout() {
    sessionStorage.order = JSON.stringify(order_all);
    window.location.href = 'checkout.html';
}

function increment(qty) {
    let x = qty.innerText;
    if (x !== "9") {
        x++;
        qty.innerText = x;
    }
}

function notify(str) {
    document.getElementById("notifyType").innerText = str;
    document.getElementById("notify").classList.add("notify-active");

    // Time the notification to only last a given number of milliseconds
    setTimeout(function(){
        document.getElementById("notify").classList.remove("notify-active");
    },2000);
}

function resetQtys() {
    const qtys = document.getElementsByClassName("qty");
    let i;
    for (i = 0; i < qtys.length; i++) {
        qtys[i].innerText = 0;
    }
}

function resizeHome() {
    if (window.innerWidth < 1080) {
        document.getElementById("header-text").style.fontSize = "250%";
    } else {
        document.getElementById("header-text").style.fontSize = "400%";
    }
}

function resizeOrder() {
    const menu_items = document.getElementsByClassName("menu-item");
    const menu_descriptions = document.getElementsByClassName("menu-description");
    const pizza_pics = document.getElementsByClassName("pic-actual");
    const pizza_descs = document.getElementsByClassName("select-p-desc");
    let i;

    if (window.innerWidth < 900) {
        document.getElementById("list-group").style.width = "80%";
        document.getElementById("title").style.fontSize = "30px";
        document.getElementById("sc_drinks").style.justifyContent = "space-between";
        document.getElementById("dc_drinks").style.justifyContent = "center";
        for (i = 0; i < menu_items.length; i++) {
            menu_items[i].style.fontSize = "21px";
            menu_descriptions[i].style.fontSize = "12px";
        }
        for (i = 0; i < pizza_pics.length; i++) {
            pizza_pics[i].style.height = "90px";
            pizza_descs[i].style.fontSize = "11px";
        }
    } else {
        document.getElementById("list-group").style.width = "50%";
        document.getElementById("title").style.fontSize = "48px";
        document.getElementById("sc_drinks").style.justifyContent = "space-between";
        document.getElementById("dc_drinks").style.justifyContent = "space-between";
        for (i = 0; i < menu_items.length; i++) {
            menu_items[i].style.fontSize = "26px";
            menu_descriptions[i].style.fontSize = "14px";
        }
        for (i = 0; i < pizza_pics.length; i++) {
            pizza_pics[i].style.height = "150px";
            pizza_descs[i].style.fontSize = "15px";
        }
    }
}