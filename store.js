/*jshint esversion: 6 */

let itemsDisplayed = 0;
let displayedst_items = 3;

let st_items = [
{title:"More apples (1)",           cost:25,      apple:1, bonus:0},
{title:"More apples (1)",           cost:50,     apple:1, bonus:0},
{title:"Unlock bonus apples",       cost:80,     apple:0, bonus:0.09},
{title:"More apples (1)",           cost:90,     apple:1, bonus:0},
{title:"Add bonus factor (0.01)",    cost:120,     apple:0, bonus:0.01},
{title:"More apples (1)",           cost:135,     apple:1, bonus:0},
{title:"Add bonus factor (0.01)",    cost:150,     apple:0, bonus:0.01},
{title:"More apples (1)",           cost:230,     apple:1, bonus:0},
{title:"More apples (2)",           cost:350,     apple:1, bonus:0},
{title:"Add bonus factor (0.005)",    cost:240,     apple:0, bonus:0.005},
{title:"Add bonus factor (0.005)",    cost:250,     apple:0, bonus:0.005},
{title:"Add bonus factor (0.01)",    cost:400,     apple:0, bonus:0.01},
{title:"More apples (3)",           cost:1000,     apple:0, bonus:0}

];

let canBuy = [];
let storeButton = [];
let daadwStore;

function storeItems() {
  //total displayed items: 4
  if (itemsDisplayed < displayedst_items) {
    document.getElementById("actualStore").innerHTML = "";
    itemsDisplayed = 0;
    daadwStore = document.getElementById("actualStore");

    if (st_items.length < displayedst_items)
      displayedst_items = st_items.length;

    for (let i = 0; i<displayedst_items; i++) {
      storeButton[i] = document.createElement("BUTTON");

      let tekst_title = document.createElement("P");
      let subtekst_title = document.createTextNode(st_items[i].title);
      tekst_title.style.cssText = "font-size: 28;";
      tekst_title.style.cssText = "font-weight: bold;";
      tekst_title.appendChild(subtekst_title);

      let tekst_cost = document.createElement("P");
      let subtekst_cost = document.createTextNode(" Cost: "+st_items[i].cost);
      tekst_cost.appendChild(subtekst_cost);

      storeButton[i].appendChild(tekst_title);
      storeButton[i].appendChild(tekst_cost);

      storeButton[i].onclick = function(){buyItem(st_items[i],i);return false;}; //Werkt niet anders, for some reason
      daadwStore.appendChild(storeButton[i]);

      itemsDisplayed++;
    }
  }
  for (let i = 0; i<displayedst_items; i++) {
    if (totalApples >= st_items[i].cost){
      canBuy[i] = 1;
      // Make the style of button different if item is purchasable
      storeButton[i].style.cssText = "background-color: #E6E6E6;";
      storeButton[i].style.color = "#000000";
    }
    else{
      canBuy[i] = 0;
      storeButton[i].style.cssText = "background-color: #C3C3C3;";
      storeButton[i].style.color = "grey";
    }
  }
}

function buyItem(item,i){
  if (totalApples >= item.cost) {
    totalApples -= item.cost;
    document.getElementById('dispApples').innerHTML = "Total apples: " + totalApples;

    if(!bonusUnlocked && item.bonus) bonusUnlocked = 1;
    appleFactor += item.bonus;
    if (bonusUnlocked)
      document.getElementById('bonus').innerHTML = "Bonus factor: " + appleFactor.toFixed(2);

    if(item.apple) {
      for (j=0; j<item.apple; j++)
      apples[apples.length] = new apple();
    }

    st_items.splice(i,1);
    itemsDisplayed--;
    col_storeItems();
    storeItems();
  }
}
