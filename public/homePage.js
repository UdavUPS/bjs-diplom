let logoutButton = new LogoutButton();
logoutButton.action = () => {ApiConnector.logout(()=>{location.reload()})}

ApiConnector.current(reload => {
    //console.log(reload.success);
    //console.log(reload.data);
    //ProfileWidget.showProfile(reload.data);
    if (reload.success) {
        ProfileWidget.showProfile(reload.data);
    }
});

//console.log(ApiConnector.getStocks('RUB'));
//ApiConnector.getStocks(reload => console.log(reload));

let ratesBoard = new RatesBoard();

function getExchangeRate() {
    ApiConnector.getStocks(reload => {
        if (reload.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(reload.data);
        }
    });
}
getExchangeRate();
setInterval(getExchangeRate, 60000);

