//retrieving data of items previously added -- if there is an error or data is null, it is reset to an empty array
var itemData;
try {
  itemData = JSON.parse(localStorage.getItem('itemData'));
}catch {
  itemData = [];
}
if (itemData == null || itemData == 'null') {
  itemData = [];
}

//creating button to show itemdata in correct format
var showBtn = createBtn('btn_green_white_innerfade btn_small float-btn', null, 'linear-gradient( to bottom, #002879 5%, #141805 95%)', 'Show Float List', 'linear-gradient(rgb(0, 87, 133) 5%, rgb(3, 40, 80) 95%)');
showBtn.addEventListener('click', function() {
  var showText = '';
  for (item of itemData) {
    try {
      showText += item + '\n';
    }catch {
      //something wrong or can't be added
    }
  }
  (showText === '') ? alert('No floats added') : alert(showText);
});
document.getElementById('floatUtilities').appendChild(showBtn);

//creating button that will reset itemdata to nothing
var resetBtn = createBtn('btn_green_white_innerfade btn_small float-btn', '10px', 'linear-gradient( to bottom, #5a1239 5%, #242b0b 95%)', 'Reset Float List', 'linear-gradient(rgb(155, 26, 26) 5%, rgb(62, 15, 15) 95%)');
resetBtn.addEventListener('click', function() {
  localStorage.setItem('itemData', '');
  itemData = [];
  addBtns();
});
document.getElementById('floatUtilities').appendChild(resetBtn);

//adding float buttons
addBtns();

//function to create buttons with specific properties
function createBtn(className, marginLeft, background, spanInnerHTML, spanBackground) {
  var btn = document.createElement('button'), span = document.createElement('span');
  if (spanInnerHTML) span.innerHTML = spanInnerHTML;
  if (spanBackground) span.style.background = spanBackground;
  btn.appendChild(span);

  if (className !== null) btn.className = className;
  if (marginLeft !== null) btn.style.marginLeft = marginLeft;
  if (background !== null) btn.style.background = background;

  return btn;
}

//function to clear float buttons
function clearBtns(index) {
  var floatBtns = document.querySelectorAll('button.andersonp196');
  if (index == 'all') {
    for (floatBtn of floatBtns) {
      floatBtn.parentNode.removeChild(floatBtn);
    }
  }else {
    floatBtns[index].parentNode.removeChild(floatBtns[index]);
  }
}

//function to add float buttons
function addBtns() {
  clearBtns('all');
  var floatDivs = document.querySelectorAll('div.float-div');

  for (floatDiv of floatDivs) {
    //checking what itemdata would be for each item
    var tempInfo = `${floatDiv.parentNode.querySelector('div.csgofloat-itemfloat').innerText.replace('Float: ', '')}++${floatDiv.parentNode.parentNode.querySelector('span.market_listing_item_name.economy_item_hoverable').innerText}++${floatDiv.parentNode.parentNode.querySelector('span.market_listing_price.market_listing_price_with_fee').innerText.replace(/ /g,'')}`, floatBtn;
    //if itemdata already contains that itemdata the button will be the red 'remove float' variety instead of green 'add float'
    (itemData.includes(tempInfo)) ? floatBtn = createBtn('btn_green_white_innerfade btn_small float-btn added andersonp196', '10px', 'linear-gradient( to bottom, #5a1239 5%, #242b0b 95%)', 'Remove Float', 'linear-gradient(rgb(155, 26, 26) 5%, rgb(62, 15, 15) 95%)') : floatBtn = createBtn('btn_green_white_innerfade btn_small float-btn andersonp196', '10px', 'linear-gradient( to bottom, #002879 5%, #141805 95%)', 'Add Float', 'linear-gradient(rgb(0, 87, 133) 5%, rgb(3, 40, 80) 95%)');

    //when button is clicked, it will toggle display and either add or remove float
    floatBtn.addEventListener('click', function() {
      var info = `${this.parentNode.querySelector('div.csgofloat-itemfloat').innerText.replace('Float: ', '')}++${this.parentNode.parentNode.querySelector('span.market_listing_item_name.economy_item_hoverable').innerText}++${this.parentNode.parentNode.parentNode.querySelector('span.market_listing_price.market_listing_price_with_fee').innerText.replace(/ /g,'')}`;
      if (!this.classList.contains('added')) {
        //if the float has not been added yet
        this.classList.add('added');
        this.childNodes[0].innerHTML = 'Remove Float';
        this.childNodes[0].style.background = 'linear-gradient(rgb(155, 26, 26) 5%, rgb(62, 15, 15) 95%)';
        this.style.background = 'linear-gradient(rgb(90, 18, 57) 5%, rgb(36, 43, 11) 95%)';
        itemData.push(info);
      }else {
        //if the float has previously been added
        this.classList.remove('added');
        this.childNodes[0].innerHTML = 'Add Float';
        this.childNodes[0].style.background = 'linear-gradient(rgb(0, 87, 133) 5%, rgb(3, 40, 80) 95%)';
        this.style.background = 'linear-gradient(rgb(0, 40, 121) 5%, rgb(20, 24, 5) 95%)';
        itemData.splice(itemData.indexOf(info), 1);
      }
      localStorage.setItem('itemData', JSON.stringify(itemData));
    });

    floatDiv.appendChild(floatBtn);
  }
}
