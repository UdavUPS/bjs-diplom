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

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response =>{
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, `Успешно пополнено: ${data.amount} ${data.currency}`);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = data =>{
    ApiConnector.convertMoney(data, response =>{
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, `Успешный перевод: ${data.amount} ${data.currency}`);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = data =>{
    ApiConnector.transferMoney(data, response =>{
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, `Успешный перевод: ${data.amount} ${data.currency}`);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    /* console.log(response); */
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});