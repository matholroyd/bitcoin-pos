var f = function() {
  // Make Big round down by default
  Big['RM'] = 0;

  var create_qrcode = function(text) {
  	var qr = qrcode(6, 'M');
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

  $('form input').keyup(function() {
    updateBtc();
  });

  $('#numpad button.digit').click(function () {
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

  var btcDecimalPlaces = 5;

  var updateBtc = function() {
    var fiat = Big($('#fiat').val());
    var btc = fiat;
    $('#btc').val(btc.toFixed(btcDecimalPlaces));
    updateQR();
  }

  var updateQR = function() {
    var btc = $('#btc').val();
    var fiat = $('#fiat').val();
    var bitcoin_address = $('#bitcoin-address').val();
  
    if(btc != "" && Big(btc) > 0 && bitcoin_address != "") {
      var s = "bitcoin:" + bitcoin_address;
      s += "?amount=" + btc;

      // TODO encourage payer's bitcoin wallet to send a message so payments can be identified
      // s += "&message=Code%20" + "some-unique-code";

      var summary = "Paying $" + fiat + " as " + btc + " BTC to " + bitcoin_address;

      $('#qr').html(create_qrcode(s));
      $('#pay-summary').text(summary); 
      $('#qrcode-instructions').hide();
    } else {
      $('#qr').html("");
      $('#pay-summary').text(""); 
      $('#qrcode-instructions').show();
    }
  }
}();
