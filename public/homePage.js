let logoutButton = new LogoutButton();
logoutButton.action = () => {ApiConnector.logout(()=>{location.reload()})}

ApiConnector.current(reload => {
    //console.log(reload.success)
    if (reload.success) {
        ProfileWidget.showProfile(reload);
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

