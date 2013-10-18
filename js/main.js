// Make Big round down by default
Big['RM'] = 0;

var create_qrcode = function(text) {
	var qr = qrcode(4, 'M');
	qr.addData(text);
	qr.make();
	return qr.createImgTag(4, 0);
};

var update_qrcode = function() {
	var text = document.forms[0].elements['msg'].value.
		replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
	document.getElementById('qr').innerHTML = create_qrcode(text);
};


$('form input').change(function() {
  updateBtc();
});

$('#numpad button.number').click(function () {
  var digit = $(this).text();
  var fiat = $('#fiat').val();
  
  if(fiat == "") {
    fiat = Big("0");
  } else {
    fiat = Big(fiat);
    fiat = fiat.times(Big("10"));
  }
  
  var cents = Big(digit).div(Big("100"));
  
  fiat = fiat.plus(cents);
  
  $('#fiat').val(fiat.toFixed(2));
  updateBtc();
});

$('#clear').click(function () {
  $('#fiat').val("0.00");
  updateBtc();
});

$('#backspace').click(function () {
  var fiat = $('#fiat').val();
  
  fiat = Big(fiat);
  fiat = fiat.div(Big("10"));
  fiat = Big(fiat.toFixed(2));

  $('#fiat').val(fiat.toFixed(2));
  updateBtc();
});

var updateBtc = function() {
  var fiat = $('#fiat').val();
  output = fiat + " BTC";
  $('#btc').text(output);
  updateQR();
}

var updateQR = function() {
  var btc = $('#btc').text();
  var s = "123473985983425:btc=" + btc;
  
  $('#qr').html(create_qrcode(s));
}
