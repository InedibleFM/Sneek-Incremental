/*jshint esversion: 6 */
let col_itemsDisplayed = 0;
let col_displayedst_items = 1;
let rainbow = 0;
let rainbowlist = [[255,0,0],[0,210,0],[255,106,0],[255,216,0],[255,0,220],[0,0,255],[87,0,127]];

let col_st_items = [
{title:"GREEN SNAKE SKIN",        cost:20,          color:[0,210,0],     stroke:[0,210,0],     url:"images/green.png",   id:"color_green"},
{title:"ORANGE SNAKE SKIN",       cost:100,         color:[255,106,0],   stroke:[255,106,0],   url:"images/orange.png",  id:"color_orange"},
{title:"YELLOW SNAKE SKIN",       cost:200,         color:[255,216,0],   stroke:[255,216,0],   url:"images/yellow.png",  id:"color_yellow"},
{title:"PINK SNAKE SKIN",         cost:350,         color:[255,0,220],   stroke:[255,0,220],   url:"images/pink.png",    id:"color_pink"},
{title:"BLUE SNAKE SKIN",         cost:500,         color:[0,0,255],     stroke:[0,0,255],     url:"images/blue.png",    id:"color_blue"},
{title:"PURPLE SNAKE SKIN",       cost:1000,        color:[87,0,127],    stroke:[87,0,127],    url:"images/purple.png",  id:"color_purple"},
{title:"CYAN SNAKE SKIN",         cost:2000,        color:[0,255,255],   stroke:[0,255,255],   url:"images/cyan.png",    id:"color_cyan"},
{title:"RAINBOW SNAKE SKIN",      cost:5000,        color:[255,0,0],     stroke:[255,0,0],     url:"images/rainbow.png", id:"color_rainbow"}
];

//enums kunnen niet gecloned worden
let copy_col_st_items = [
{title:"GREEN SNAKE SKIN",        cost:20,          color:[0,210,0],     stroke:[0,210,0],     url:"images/green.png",   id:"color_green"},
{title:"ORANGE SNAKE SKIN",       cost:100,         color:[255,106,0],   stroke:[255,106,0],   url:"images/orange.png",  id:"color_orange"},
{title:"YELLOW SNAKE SKIN",       cost:200,         color:[255,216,0],   stroke:[255,216,0],   url:"images/yellow.png",  id:"color_yellow"},
{title:"PINK SNAKE SKIN",         cost:350,         color:[255,0,220],   stroke:[255,0,220],   url:"images/pink.png",    id:"color_pink"},
{title:"BLUE SNAKE SKIN",         cost:500,         color:[0,0,255],     stroke:[0,0,255],     url:"images/blue.png",    id:"color_blue"},
{title:"PURPLE SNAKE SKIN",       cost:1000,        color:[87,0,127],    stroke:[87,0,127],    url:"images/purple.png",  id:"color_purple"},
{title:"CYAN SNAKE SKIN",         cost:2000,        color:[0,255,255],   stroke:[0,255,255],   url:"images/cyan.png",    id:"color_cyan"},
{title:"RAINBOW SNAKE SKIN",      cost:5000,        color:[255,0,0],     stroke:[255,0,0],     url:"images/rainbow.png", id:"color_rainbow"}
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
    document.getElementById(item.id).style.cssText  = "background-image: url("+item.url+");";

    rainbow = 0;
    snakeColor = item.color;

    if (item.id == "color_yellow") {
      helpMenuNot = 1;
      if (dead) {
        textSize(20);
        text("(Select your skins in the help menu at the top)", 100, 450);
      }
    }
    if (item.id == "color_cyan") helpMenuNot = 0;

    player.showI();
    rect(snake_history[snake_history.length-length-1][0]*20+2, snake_history[snake_history.length-length-1][1]*20+2, 16, 16);

    if (item.id == "color_rainbow") {
      rainbow = 1;
      player.showI();
    }


    bottombar();
    if (dead) gameText();

    col_st_items.splice(i,1);
    col_itemsDisplayed--;
    col_storeItems();
    storeItems();
  }
}


function setColor(color) {
  let findIt = 0;
  for (let i=0; i<col_st_items.length; i++) {
    if (col_st_items[i].id == color){
      findIt = 1;
      console.log(findIt);
    }
  }

  if (!findIt) {
    if (color == "color_white") {
      snakeColor = [255, 255, 255];
      rainbow = 0;
    }

    else {
      for (let i=0; i<copy_col_st_items.length; i++) {
        if (copy_col_st_items[i].id == color){
          snakeColor = copy_col_st_items[i].color;
          rainbow = 0;
        }
      }
    }

    if (color == "color_rainbow"){
      console.log("hnn");
      rainbow = 1;
    }

    player.showI();
    rect(snake_history[snake_history.length-length-1][0]*20+2, snake_history[snake_history.length-length-1][1]*20+2, 16, 16);
    }

}
