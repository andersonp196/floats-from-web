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

console.log(itemData);

if (window.location.href.includes('bitskins')) {
  bit();
}else if (window.location.href.includes('steamcommunity')) {
  scm();
}

//---------------- need to append to storage instead of overwriting so that bitskins and scm can display each other's floats -------
//above may be incorrect. simpler to have different lists for scm and bitskins

function bit() {
  //creating button to show itemdata in correct format
  var showBtn = createBtn(
    {
      className:{prop:'btn btn-success btn-xs'},
      marginLeft:{prop:'10px',style:'true'},
      innerText:{prop:'Show Float List'}
    });
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
  document.querySelector('div.col-md-8.col-sm-12.col-xs-12.col-md-offset-2.col-sm-offset-0.col-xs-offset-0').appendChild(showBtn);

  //creating button that will reset itemdata to nothing
  var resetBtn = showBtn = createBtn(
    {
      className:{prop:'btn btn-success btn-xs'},
      marginLeft:{prop:'10px',style:'true'},
      innerText:{prop:'Clear Float List'}
    });
  resetBtn.addEventListener('click', function() {
    localStorage.setItem('itemData', '');
    itemData = [];
    bitBtns();
  });
  document.querySelector('div.col-md-8.col-sm-12.col-xs-12.col-md-offset-2.col-sm-offset-0.col-xs-offset-0').appendChild(resetBtn);

  //adding float buttons
  bitBtns();
}

function scm() {
  //creating button to show itemdata in correct format
  var showBtn = createBtn(
    {
      className:{prop:'btn_green_white_innerfade btn_small float-btn'},
      background:{prop:'linear-gradient( to bottom, #002879 5%, #141805 95%)',style:'true'}
    },
    {
      innerText:{prop:'Show Float List'},
      background:{prop:'linear-gradient(rgb(0, 87, 133) 5%, rgb(3, 40, 80) 95%)',style:'true'}
    });
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
  var resetBtn = createBtn(
    {
      className:{prop:'btn_green_white_innerfade btn_small float-btn'},
      background:{prop:'linear-gradient( to bottom, #5a1239 5%, #242b0b 95%)',style:'true'}
    },
    {
      innerText:{prop:'Clear Float List'},
      background:{prop:'linear-gradient(rgb(155, 26, 26) 5%, rgb(62, 15, 15) 95%)',style:'true'}
    });
  resetBtn.addEventListener('click', function() {
    localStorage.setItem('itemData', '');
    itemData = [];
    scmBtns();
  });
  document.getElementById('floatUtilities').appendChild(resetBtn);

  //adding float buttons
  scmBtns();
}

//function to create buttons with specific properties
function createBtn(btn, span) {
  var tempBtn = document.createElement('button');
  for (key of Object.keys(btn)) {
    if (btn[key].style) {
      tempBtn.style[key] = btn[key].prop;
    }else {
      tempBtn[key] = btn[key].prop;
    }
  }
  if (span) {
    var tempSpan = document.createElement('span');
    for (key of Object.keys(span)) {
      if (span[key].style) {
        tempSpan.style[key] = span[key].prop;
      }else {
        tempSpan[key] = span[key].prop;
      }
    }
    tempBtn.appendChild(tempSpan);
  }
  return tempBtn;
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

//function to add float buttons for bitskins
function bitBtns() {
  clearBtns('all');
  var itemDivs = document.querySelectorAll('div.item-solo');

  for (div of itemDivs) {
    //checking what itemdata would be for each item
    var tempInfo = `${div.querySelector('div.text-muted.text-center').innerText.replace('Wear: ', '')}++${div.querySelector('div.panel-heading.item-title').innerText}++${div.querySelector('span.item-price-display').innerText}`, floatBtn;
    //if itemdata already contains that itemdata the button will be the red 'remove float' variety instead of green 'add float'
    (itemData.includes(tempInfo)) ? floatBtn = createBtn(
      {
        className:{prop:'btn btn-success btn-xs added andersonp196'},
        marginLeft:{prop:'0.1px',style:'true'},
        innerText:{prop:'Remove Float'}
      }) : floatBtn = createBtn(
      {
        className:{prop:'btn btn-success btn-xs andersonp196'},
        marginLeft:{prop:'0.1px',style:'true'},
        innerText:{prop:'Add Float'}
      });

    //when button is clicked, it will toggle display and either add or remove float
    floatBtn.addEventListener('click', function() {
      var info = `${this.parentNode.parentNode.parentNode.parentNode.querySelector('div.text-muted.text-center').innerText.replace('Wear: ', '')}++${this.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('div.panel-heading.item-title').innerText}++${this.parentNode.parentNode.parentNode.querySelector('span.item-price-display').innerText}`;
      if (!this.classList.contains('added')) {
        //if the float has not been added yet
        this.classList.add('added');
        this.innerHTML = 'Remove Float';
        itemData.push(info);
      }else {
        //if the float has previously been added
        this.classList.remove('added');
        this.innerHTML = 'Add Float';
        itemData.splice(itemData.indexOf(info), 1);
      }
      localStorage.setItem('itemData', JSON.stringify(itemData));
    });

    div.querySelector('button.btn.btn-success.btn-xs.addToCartButton').parentNode.appendChild(floatBtn);
  }
}

//function to add float buttons for steam community market
function scmBtns() {
  clearBtns('all');
  var floatDivs = document.querySelectorAll('div.float-div');

  for (floatDiv of floatDivs) {
    //checking what itemdata would be for each item
    var tempInfo = `${floatDiv.parentNode.querySelector('div.csgofloat-itemfloat').innerText.replace('Float: ', '')}++${floatDiv.parentNode.parentNode.querySelector('span.market_listing_item_name.economy_item_hoverable').innerText}++${floatDiv.parentNode.parentNode.querySelector('span.market_listing_price.market_listing_price_with_fee').innerText.replace(/ /g,'')}`, floatBtn;
    //if itemdata already contains that itemdata the button will be the red 'remove float' variety instead of green 'add float'
    (itemData.includes(tempInfo)) ? floatBtn = createBtn(
      {
        className:{prop:'btn_green_white_innerfade btn_small float-btn added andersonp196',},
        marginLeft:{prop:'10px',style:'true'},
        background:{prop:'linear-gradient( to bottom, #5a1239 5%, #242b0b 95%)',style:'true'}
      },
      {
        innerHTML:{prop:'Remove Float'},
        background:{prop:'linear-gradient(rgb(155, 26, 26) 5%, rgb(62, 15, 15) 95%)',style:'true'}
      }) : floatBtn = createBtn(
      {
        className:{prop:'btn_green_white_innerfade btn_small float-btn andersonp196',},
        marginLeft:{prop:'10px',style:'true'},
        background:{prop:'linear-gradient( to bottom, #002879 5%, #141805 95%)',style:'true'}
      },
      {
        innerHTML:{prop:'Add Float'},
        background:{prop:'linear-gradient(rgb(0, 87, 133) 5%, rgb(3, 40, 80) 95%)',style:'true'}
      });

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
