export const getUser = () => {
    var userData = localStorage.getItem('user');
    var parsedData = JSON.parse(userData);
    return parsedData.nombreUsuario;
}