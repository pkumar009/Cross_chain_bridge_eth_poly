const serverUrl = "https://gpfrdxbdsjm6.usemoralis.com:2053/server";//"https://ay1hjfmuqpcy.usemoralis.com:2053/server";
const appId = "GCaiARVC2gedDoBp8bx3zJ6gsecJvAzMbi24nLks";//"dcMsgEDUbxrUOH0uO5WKjMp9xTFvFq8HEJaFhJgC";
Moralis.start({ serverUrl, appId }); 

const childTokenAddress = "0xdEb8078264404eD3f8984994CEb006C8b255940B";
const sideBridgeAddress = "0x180D47A49f1F74Bef5833990d3bc083dE42a3be4";

login();

async function login(){
    Moralis.Web3.enableWeb3().then(async function (){
        renderReturnData();
        const chainIdHex = await Moralis.switchNetwork("0x13881"); 
    });
}

async function returnToken(){
    const amountToReturn = document.getElementById("amountToken").value;
    if(!isNaN(amountToReturn)&&(amountToReturn)){
    const options = {type: "erc20", 
                 amount: Moralis.Units.Token(amountToReturn, "18"), 
                 receiver: sideBridgeAddress,
                 contractAddress: childTokenAddress}
    let result = await Moralis.transfer(options)
    }
    else{
        alert("Only numbers are allowed");
    }
}

async function renderReturnData () {
    queryReturned().then( (returnedData) => {
        buildTableReturned(returnedData);
    });
    queryUnlocked().then( (unlockedData) => {
        buildTableUnlocked(unlockedData);
    });
}

async function queryReturned(){
    const query = new Moralis.Query("TokensReturned");
    query.equalTo("requester", ethereum.selectedAddress);
    const results = await query.find()
    return JSON.parse(JSON.stringify(results, ["sideDepositHash", "amount", "requester"]))
}

async function queryUnlocked(){
    const query = new Moralis.Query("TokensUnlocked");
    query.equalTo("requester", ethereum.selectedAddress);
    const results = await query.find()
    return JSON.parse(JSON.stringify(results, ["sideDepositHash", "amount", "requester"]))
}

function buildTableReturned(data){
    document.getElementById("returnedTransactions").innerHTML = `<table class="table table-dark table-striped" id="returnedTable">
                                                            </table>`;
    const table = document.getElementById("returnedTable");
    const rowHeader = `<thead>
                            <tr>
                                <th>Side Deposit Hash</th>
                                <th>Amount Bridged</th>
                                <th>Requester</th>
                            </tr>
                        </thead>`
    table.innerHTML += rowHeader;
    for (let i=0; i < data.length; i++){
        let row = `<tr>
                        <td>${data[i].sideDepositHash}</td>
                        <td>${data[i].amount/1e18}</td>
                        <td>${data[i].requester}</td>
                    </tr>`
        table.innerHTML += row
    }
}

function buildTableUnlocked(data){
    document.getElementById("tokensUnlocked").innerHTML = `<table class="table table-dark table-striped" id="unlockedTable">
                                                            </table>`;
    const table = document.getElementById("unlockedTable");
    const rowHeader = `<thead>
                            <tr>
                                <th>Side Deposit Hash</th>
                                <th>Amount Bridged</th>
                                <th>Requester</th>
                            </tr>
                        </thead>`
    table.innerHTML += rowHeader;
    for (let i=0; i < data.length; i++){
        let row = `<tr>
                        <td>${data[i].sideDepositHash}</td>
                        <td>${data[i].amount/1e18}</td>
                        <td>${data[i].requester}</td>
                    </tr>`
        table.innerHTML += row
    }
}
