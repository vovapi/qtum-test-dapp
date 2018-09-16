import $ from 'jquery';
window.$ = $;
window.jQuery;
import Qweb3 from 'qweb3';

var client;
$(function() {
    function qryptoAcctChanged(event) {
    if (event.data.message && event.data.message.type == "ACCOUNT_CHANGED") {
        if (event.data.message.payload.error){
            console.log("error:", event.data.message.payload.error);
            return;
        }
        console.log("account:", event.data.message.payload.account)
        if (event.data.message.payload.account) {
            var account = event.data.message.payload.account;
            document.getElementById("address").innerText = account.address;
            document.getElementById("name").innerText = account.name;
            document.getElementById("network").innerText = account.network;
            document.getElementById("balance").innerText = account.balance;
        }
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
        
    })
});