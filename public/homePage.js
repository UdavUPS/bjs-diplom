let logoutButton = new LogoutButton();
logoutButton.action = () => {ApiConnector.logout(()=>{location.reload()})}