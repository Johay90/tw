javascript:
var url_string = window.location.href; 
var url = new URL(url_string);
var mode = url.searchParams.get("mode");
var screen = url.searchParams.get("screen")
if (mode == "exchange" && screen == "market"){

    var Merchants = parseInt(Data.Trader.amount); // Available Merchants
    var wood = parseInt(game_data.village.wood);
    var clay = parseInt(game_data.village.stone);
    var iron = parseInt(game_data.village.iron);
    var woodExchange = parseInt($('#premium_exchange_rate_wood > div:nth-child(1)').text()); // Prob would need to do things with PremiumExchange data to get these, so jquery is fine.
    var clayExchange = parseInt($('#premium_exchange_rate_stone > div:nth-child(1)').text());
    var ironExchange = parseInt($('#premium_exchange_rate_iron > div:nth-child(1)').text());


        $("<div></div>").attr('id', 'bestRes').insertBefore('#premium_exchange_form > input');
            $("#bestRes").html('<input type="button" id="chooseResBtn" class="btn float_right btn-premium-exchange-buy" style="margin-top: 10px; margin-bottom: 10px;" value="Input Res "></input>'); 

            if (Merchants == 0) {
                $("#chooseResBtn").click(function() {
                    alert("No merchants, try again later.");
                });  
            } else {

        if (Math.floor(wood / woodExchange) > Math.floor(clay / clayExchange) && (Math.floor(wood / woodExchange) > Math.floor(iron / ironExchange)) ) {
            var resAmount = woodExchange * Math.floor(wood / woodExchange);
            if (Merchants * 1000 < resAmount) {
                for (let index = 0; index < Merchants; index++) {
                    if (Merchants * 1000 > resAmount) { break; }
                    else {resAmount = resAmount - woodExchange;}
                }
            }
            $("#chooseResBtn").click(function() {
                $('#premium_exchange_sell_wood > div:nth-child(1) > input').val(Math.floor(resAmount / 100) * 100);
                setTimeout(function(){
                    $("#premium_exchange_sell_wood > div:nth-child(1) > input").keyup();
                }, 50);
            });
        } else if (Math.floor(clay / clayExchange) > Math.floor(wood / woodExchange) && (Math.floor(clay / clayExchange) > Math.floor(iron / ironExchange)) ) {
            var resAmount = clayExchange * Math.floor(clay / clayExchange);
            if (Merchants * 1000 < resAmount) {
                for (let index = 0; index < Merchants; index++) {
                    if (Merchants * 1000 > resAmount) { break; }
                    else {resAmount = resAmount - clayExchange;}
                }
            }
            $("#chooseResBtn").click(function() {
                $('#premium_exchange_sell_stone > div:nth-child(1) > input').val(Math.floor(resAmount / 100) * 100);
                setTimeout(function(){
                    $("#premium_exchange_sell_stone > div:nth-child(1) > input").keyup();
                }, 50);
            });
        } else{
            var resAmount = ironExchange * Math.floor(iron / ironExchange);
            if (Merchants * 1000 < resAmount) {
                for (let index = 0; index < Merchants; index++) {
                    if (Merchants * 1000 > resAmount) { break; }
                    else {resAmount = resAmount - ironExchange;}
                }
            }
            $("#chooseResBtn").click(function() {
                $('#premium_exchange_sell_iron > div:nth-child(1) > input').val(Math.floor(resAmount / 100) * 100);
                setTimeout(function(){
                    $("#premium_exchange_sell_iron > div:nth-child(1) > input").keyup();
                }, 50);
            });
        }
    }
}else{
    alert("Only run on market p exchange.");
}




