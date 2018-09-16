import $ from 'jquery';
window.$ = $;
window.jQuery;
import Qweb3 from 'qweb3';
import 'bootstrap';
import './scss/index.scss';

var client;

function updateAccount(account) {
    console.log('account', account);
    if (account && account.balance) {
        document.getElementById("main").classList.remove('d-none')
        document.getElementById("address").textContent = account.address;
        document.getElementById("balance").textContent = account.balance.toString() + " QTUM";
    }
}

$(function() {
    function qryptoAcctChanged(event) {
    console.log(event);
    if (event.data.message && event.data.message.type == "ACCOUNT_CHANGED") {
        if (event.data.message.payload.error){
            console.log("error:", event.data.message.payload.error);
            return;
        }
        console.log("account:", event.data.message.payload.account)
        updateAccount(event.data.message.payload.account);
        }
    }
    window.addEventListener('message', qryptoAcctChanged, false);
    $(window).on('load', function() {
        window.postMessage({ message: { type: 'CONNECT_QRYPTO' }}, '*');
    });
    $(window).on('load', function() {
        client = new Qweb3.Qweb3(window.qrypto.rpcProvider);
        console.log(client);
        window.Qweb3Client = client;
        if (window.qrypto.account) {
            updateAccount(window.qrypto.account);
        };
    })
});