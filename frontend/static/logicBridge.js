const serverUrl = "https://gpfrdxbdsjm6.usemoralis.com:2053/server";//"https://ay1hjfmuqpcy.usemoralis.com:2053/server";
const appId = "GCaiARVC2gedDoBp8bx3zJ6gsecJvAzMbi24nLks";//"dcMsgEDUbxrUOH0uO5WKjMp9xTFvFq8HEJaFhJgC";
Moralis.start({ serverUrl, appId }); 

const mainTokenAddress = "0x3830B2d812DdaA12944856158c2300e024D50ADd";
const mainBridgeAddress = "0x9dA77697149bE10e5fE81d9Ca47adEE4f992435C";

login();

async function login(){
    Moralis.Web3.enableWeb3().then(async function (){
        renderBridgeData();
        const chainIdHex = await Moralis.switchNetwork("0x4"); 
    });
}

async function bridge(){
    const amountToBridge = document.getElementById("amountToken").value;
    
    if(!isNaN(amountToBridge)&&(amountToBridge)){
        const options = {type: "erc20", 
        amount: Moralis.Units.Token(amountToBridge, "18"), 
        receiver: mainBridgeAddress,
        contractAddress: mainTokenAddress}
        let result = await Moralis.transfer(options)
    }
    else{
        alert("Only numbers are allowed");
    }
    
}

async function renderBridgeData () {
    queryLocked().then( (lockedData)=> {
        buildTableLocked(lockedData);
       // console.log(lockedData);
    });
    queryBridged().then( (bridgedData) =>{
        buildTableBridged(bridgedData);
    });
}

async function queryLocked(){
    const query = new Moralis.Query("TokensLocked");
    query.equalTo("requester", ethereum.selectedAddress);
    const results = await query.find()
    return JSON.parse(JSON.stringify(results, ["mainDepositHash", "amount", "requester"]))
}

async function queryBridged(){
    const query = new Moralis.Query("TokensBridged");
    query.equalTo("requester", ethereum.selectedAddress);
    const results = await query.find()
    return JSON.parse(JSON.stringify(results, ["mainDepositHash", "amount", "requester"]))
}

function buildTableLocked(data){
    document.getElementById("lockedTransactions").innerHTML = `<table class="table table-dark table-striped" id="lockedTable">
                                                            </table>`;
    const table = document.getElementById("lockedTable");
    const rowHeader = `<thead>
                            <tr>
                                <th>Main Deposit Hash</th>
                                <th>Amount Locked</th>
                                <th>Requester</th>
                            </tr>
                        </thead>`
    table.innerHTML += rowHeader;
    for (let i=0; i < data.length; i++){
        let row = `<tr>
                        <td>${data[i].mainDepositHash}</td>
                        <td>${data[i].amount/1e18}</td>
                        <td>${data[i].requester}</td>
                    </tr>`
        table.innerHTML += row
    }
}

function buildTableBridged(data){
    document.getElementById("tokensBridged").innerHTML = `<table class="table table-dark table-striped" id="bridgedTable">
                                                            </table>`;
    const table = document.getElementById("bridgedTable");
    const rowHeader = `<thead>
                            <tr>
                                <th>Main Deposit Hash</th>
                                <th>Amount Bridged</th>
                                <th>Requester</th>
                            </tr>
                        </thead>`
    table.innerHTML += rowHeader;
    for (let i=0; i < data.length; i++){
        let row = `<tr>
                        <td>${data[i].mainDepositHash}</td>
                        <td>${data[i].amount/1e18}</td>
                        <td>${data[i].requester}</td>
                    </tr>`
        table.innerHTML += row
    }
}
