/*jshint esversion: 6 */


let col_itemsDisplayed = 0;
let col_displayedst_items = 1;

let col_st_items = [
{title:"GREEN SNAKE SKIN",        cost:20,          color:[0,210,0]},
{title:"ORANGE SNAKE SKIN",       cost:100,         color:[255,106,0]},
{title:"YELLOW SNAKE SKIN",       cost:200,         color:[255,216,0]},
{title:"PINK SNAKE SKIN",         cost:350,         color:[255,0,220]},
{title:"BLUE SNAKE SKIN",         cost:500,         color:[0,0,255]},
{title:"PURPLE SNAKE SKIN",       cost:1000,        color:[87,0,127]},
{title:"CYAN SNAKE SKIN",         cost:2000,        color:[0,255,255]},
{title:"RAINBOW SNAKE SKIN",      cost:5000,        color:[100,240,240]}
];

let col_canBuy = [];
let col_storeButton = [];
let col_daadwStore;

function col_storeItems() {
  //total displayed items: 4
  if (col_itemsDisplayed < col_displayedst_items) {
    document.getElementById("colorStore").innerHTML = "";
    col_itemsDisplayed = 0;
    col_daadwStore = document.getElementById("colorStore");

    if (col_st_items.length < col_displayedst_items)
      col_displayedst_items = col_st_items.length;

    for (let i = 0; i<col_displayedst_items; i++) {
      col_storeButton[i] = document.createElement("BUTTON");

      let tekst_title = document.createElement("P");
      let subtekst_title = document.createTextNode(col_st_items[i].title);
      tekst_title.style.cssText = "font-size: 28;";
      tekst_title.style.cssText = "font-weight: bold;";
      tekst_title.appendChild(subtekst_title);

      let tekst_cost = document.createElement("P");
      let subtekst_cost = document.createTextNode(" Cost: "+col_st_items[i].cost);
      tekst_cost.appendChild(subtekst_cost);

      col_storeButton[i].appendChild(tekst_title);
      col_storeButton[i].appendChild(tekst_cost);

      col_storeButton[i].onclick = function(){col_buyItem(col_st_items[i],i);return false;}; //Werkt niet anders, for some reason
      col_daadwStore.appendChild(col_storeButton[i]);

      col_itemsDisplayed++;
    }
  }
  for (let i = 0; i<col_displayedst_items; i++) {
    if (totalApples >= col_st_items[i].cost){
      col_canBuy[i] = 1;
      // Make the style of button different if item is purchasable
      col_storeButton[i].style.cssText = "background-color: #E6E6E6;";
      col_storeButton[i].style.color = "#000000";
    }
    else{
      col_canBuy[i] = 0;
      col_storeButton[i].style.cssText = "background-color: #C3C3C3;";
      col_storeButton[i].style.color = "grey";
    }
  }
}

function col_buyItem(item,i){
  if (totalApples >= item.cost) {
    totalApples -= item.cost;
    document.getElementById('dispApples').innerHTML = "Total apples: " + totalApples;

    snakeColor = item.color;
    player.showI();
    rect(snake_history[snake_history.length-length-1][0]*20+2, snake_history[snake_history.length-length-1][1]*20+2, 16, 16);
    bottombar();
    if (dead) gameText();

    col_st_items.splice(i,1);
    col_itemsDisplayed--;
    col_storeItems();
    storeItems();
  }
}
