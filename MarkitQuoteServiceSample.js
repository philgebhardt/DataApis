/**
 * Version 1.0, Jan 2012
 */

 /**
 {
 "Status":"SUCCESS",
 "Name":"Netflix Inc",
 "Symbol":"NFLX",
 "LastPrice":414.18,
 "Change":0.100000000000023,
 "ChangePercent":0.0241499227202528,
 "Timestamp": "Thu Apr 2 15:59:00 UTC-04:00 2015",
 "MSDate":42096.6659722222,
 "MarketCap":25057061640,
 "Volume":58154,
 "ChangeYTD":341.61,
 "ChangePercentYTD":21.2435233160622,
 "High":417.14,
 "Low":412.22,
 "Open":413.84
 }

 */

var Markit = {};

Markit.const = {
  JSON_STATUS : "Status",
  JSON_NAME : "Name",
  JSON_SYMBOL : "Symbol",
  JSON_LAST_PRICE : "LastPrice",
  JSON_CHANGE : "Change",
  JSON_CHANGE_PERCENT : "ChangePercent",
  JSON_TIMESTAMPT : "Timestamp",
  JSON_MS_DATE : "MSDate",
  JSON_MARKET_CAP : "MarketCap",
  JSON_VOLUME : "Volume",
  JSON_CHANGE_YTD : "ChangeYTD",
  JSON_CHANGE_PERCENT_YTD : "ChangePercentYTD",
  JSON_HIGH : "High",
  JSON_LOW : "Low",
  JSON_OPEN : "Open"
}

/**
* Define the QuoteService.
* First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
* Second argument is fCallback, a callback function executed onSuccess of API.
*/
Markit.QuoteService = function(sSymbol, fCallback) {
    this.symbol = sSymbol;
    this.fCallback = fCallback;
    this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
    this.makeRequest();
};
/**
* Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
*/
Markit.QuoteService.prototype.handleSuccess = function(jsonResult) {
    this.fCallback(jsonResult);
};
/**
* Ajax error callback
*/
Markit.QuoteService.prototype.handleError = function(jsonResult) {
    console.error(jsonResult);
};
/**
* Starts a new ajax request to the Quote API
*/
Markit.QuoteService.prototype.makeRequest = function() {
    //Abort any open requests
    if (this.xhr) { this.xhr.abort(); }
    //Start a new request
    this.xhr = $.ajax({
        data: { symbol: this.symbol },
        url: this.DATA_SRC,
        dataType: "jsonp",
        success: this.handleSuccess,
        error: this.handleError,
        context: this
    });
};

//document.getElementById
$("#search_btn").click(function() {
  var stock = $("#search_input").val();
  new Markit.QuoteService(stock, function(jsonResult) {

      //Catch errors
      if (!jsonResult || jsonResult.Message){
          console.error("Error: ", jsonResult.Message);
          return;
      }

      //If all goes well, your quote will be here.
      //console.log(jsonResult);

      //Now proceed to do something with the data.
      $("h1").first().text(jsonResult.Name);

      var table_str = '<table style="width:100%">';

      for (var key in jsonResult) {
        if (jsonResult.hasOwnProperty(key)) {
          table_str += '<tr>' +
                         '<td>'+key+'</td>' +
                         '<td>'+jsonResult[key]+'</td>' +
                      '</tr>'
        }
      }
      table_str += '</table>';

      /*
      * The following commented out line should be equivalent to the working line
      * right below it... But it does not. Dont know why..
      * $("#result_panel").innerHTML = table_str;
      */
      document.getElementById("result_panel").innerHTML = table_str;

      /**
      * Need help? Visit the API documentation at:
      * http://dev.markitondemand.com
      */
  });
});
