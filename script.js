function clearPizzaSelections(pizzas) {
    for (let i = 0; i < pizzas.length; i++) {
        if (pizzas[i].classList.contains("pizza-selected")) {
            pizzas[i].classList.remove("pizza-selected");
        }
    }
}

function clickX(x, type, i) {
    // Remove it from the actual order
    if (type === 0) order_all.sc.splice(i, 1);
    else if (type === 1) order_all.dc.splice(i, 1);
    else if (type === 2) order_all.alc_p.splice(i, 1);
    else if (type === 3) order_all.alc_h.splice(i, 1);
    else if (type === 4) order_all.alc_d.splice(i, 1);
    updateSessionOrder();
    fancyRemove(x.parentElement.parentElement);
}

function closeColl(content, image) {
    if (content.id === "alc") resetQtys();
    content.style.maxHeight = null;
    clearPizzaSelections(pizzas);
    resetDrinks();
    image.setAttribute("style","background-image:url(\"/images/chevron-down.svg\")");
}

function decrement(qty) {
    let x = qty.innerText;
    if (x !== "0") {
        x--;
        qty.innerText = x;
    }
}

function displayEmptyList() {
    let div = document.createElement("div");
    div.innerHTML = "Nothing to see here...";
    div.style.textAlign = "center";
    document.getElementById("order-list").appendChild(div);
}

function displayItem(type, i) {
    // Create all divs with their classes and innerHTML
    let div1 = document.createElement("div");
    div1.classList.add("order-list-item");
    div1.classList.add("order-border");
    div1.style.marginBottom = "5px";
    let div1a = document.createElement("div");
    div1a.classList.add("order-list-item-desc");
    let div1a1 = document.createElement("div");
    if (type === 0) div1a1.innerHTML = "<b>Single Combo</b>";
    else if (type === 1) div1a1.innerHTML = "<b>Double Combo</b>";
    else if (type === 2) div1a1.innerHTML = "<b>A La Carte Pizza</b>";
    else if (type === 3) div1a1.innerHTML = "<b>Extra GoatHorns</b>";
    else if (type === 4) div1a1.innerHTML = "<b>Extra Drink</b>";
    let div1a2 = document.createElement("div");
    if (type === 0) div1a2.innerHTML = order_all.sc[i].toString();
    else if (type === 1) div1a2.innerHTML = order_all.dc[i].toString();
    else if (type === 2) div1a2.innerHTML = order_all.alc_p[i];
    else if (type === 3) div1a2.innerHTML = order_all.alc_h[i];
    else if (type === 4) div1a2.innerHTML = order_all.alc_d[i];
    let div1b = document.createElement("div");
    div1b.classList.add("price-x");
    let div1b1 = document.createElement("div");
    if (type === 0) div1b1.innerHTML = "$8.00";
    else if (type === 1) div1b1.innerHTML = "$15.00";
    else if (type === 2) div1b1.innerHTML = "$6.00";
    else if (type === 3) div1b1.innerHTML = "$3.00";
    else if (type === 4) div1b1.innerHTML = "$1.00";
    let div1b2 = document.createElement("div");
    div1b2.classList.add("x-button");
    div1b2.onclick = function () {
        clickX(div1b2, type, i);
    }
    // Build the family tree
    div1.appendChild(div1a);
    div1.appendChild(div1b);
    div1a.appendChild(div1a1);
    div1a.appendChild(div1a2);
    div1b.appendChild(div1b1);
    div1b.appendChild(div1b2);
    document.getElementById("order-list").appendChild(div1);
}

function displayList() {
    // Reset by removing what is already being displayed
    let order_list = document.getElementById("order-list");
    if (order_all.isEmpty()) {
        if (order_list.children.length < 1) {
            displayEmptyList();
        }
        return;
    }
    removeChildren(order_list);
    // Add everything to the parent div one at a time
    for (let i = 0; i < order_all.sc.length; i++) {
        displayItem(0, i);
    }
    for (let i = 0; i < order_all.dc.length; i++) {
        displayItem(1, i);
    }
    for (let i = 0; i < order_all.alc_p.length; i++) {
        displayItem(2, i);
    }
    for (let i = 0; i < order_all.alc_h.length; i++) {
        displayItem(3, i);
    }
    for (let i = 0; i < order_all.alc_d.length; i++) {
        displayItem(4, i);
    }
    // Add the checkout button
    let button_box = document.createElement("div");
    button_box.classList.add("drink-order");
    button_box.classList.add("drink-order2");
    let button_actual = document.createElement("div");
    button_actual.classList.add("add-order");
    button_actual.addEventListener("click", function () {
        gotoCheckout();
    })
    button_actual.innerHTML = "CHECKOUT";
    button_box.appendChild(button_actual);
    order_list.appendChild(button_box);
}

function fancyRemove(element) {
    // make the div fade away
    let t = 40;
    let test = setInterval(function () {
        if (!element.style.opacity) {
            element.style.opacity = "1";
        }
        if (element.style.opacity > 0) {
            element.style.opacity -= "0.1";
        } else {
            element.remove();
            displayList();
            clearInterval(test);
        }
    }, t);

    setTimeout(function () {
        let order_list = document.getElementById("order-list");
        if (order_list.firstElementChild.classList.contains("drink-order")) {
            order_list.firstElementChild.remove();
            displayEmptyList();
        }
    }, (t * 11) + 1);
}

function gotoCheckout() {
    updateSessionOrder();
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

function removeChildren(element) {
    if (element.children.length < 1) return;
    for (let i = element.children.length - 1; i > -1; i--) {
        element.children[i].remove();
    }
}

function resetDrinks() {
    let slc = document.getElementsByClassName("slc");
    for (let i = 0; i < slc.length; i++) {
        slc[i].value = 0;
    }
}

function resetQtys() {
    const qtys = document.getElementsByClassName("qty");
    for (let i = 0; i < qtys.length; i++) {
        qtys[i].innerText = 0;
    }
}

function resizeCheckout() {
    if (window.innerWidth < 604) {
        document.getElementById("title").style.fontSize = "30px";
        document.getElementById("pickup-desc").style.fontSize = "13px";
        document.getElementById("calendar-box").style.width = "80%";
    } else {
        document.getElementById("title").style.fontSize = "48px";
        document.getElementById("pickup-desc").style.fontSize = "20px";
        document.getElementById("calendar-box").style.width = "50%";
    }
}

function resizeHome() {
    if (window.innerWidth < 900) {
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

    if (window.innerWidth < 900) {
        document.getElementById("list-group").style.width = "80%";
        document.getElementById("title").style.fontSize = "30px";
        document.getElementById("sc_drinks").style.justifyContent = "space-between";
        document.getElementById("dc_drinks").style.justifyContent = "center";
        for (let i = 0; i < menu_items.length; i++) {
            menu_items[i].style.fontSize = "21px";
            menu_descriptions[i].style.fontSize = "12px";
        }
        for (let i = 0; i < pizza_pics.length; i++) {
            pizza_pics[i].style.height = "90px";
            pizza_descs[i].style.fontSize = "11px";
        }
    } else {
        document.getElementById("list-group").style.width = "50%";
        document.getElementById("title").style.fontSize = "48px";
        document.getElementById("sc_drinks").style.justifyContent = "space-between";
        document.getElementById("dc_drinks").style.justifyContent = "space-between";
        for (let i = 0; i < menu_items.length; i++) {
            menu_items[i].style.fontSize = "26px";
            menu_descriptions[i].style.fontSize = "14px";
        }
        for (let i = 0; i < pizza_pics.length; i++) {
            pizza_pics[i].style.height = "150px";
            pizza_descs[i].style.fontSize = "15px";
        }
    }
}

function updateSessionOrder() {
    sessionStorage.order = JSON.stringify(order_all);
}