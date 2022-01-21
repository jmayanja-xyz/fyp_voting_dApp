import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Container, Form, Navbar, Card, Stack, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ballot from './contracts/Ballot.json';



const MetaMask_Wallet = () => {

const [errorMessage, setErrorMessage] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [userBalance, setUserBalance] = useState(null);
const [connectButtonText, setConnectButtonText] = useState('Connect Wallet');

const [contractAddress, setContractAddress] = useState(null);

const [ballotProposal, setBallotProposal] = useState(null);

const [table, setTable] = useState([]);

const [voteNumber, setVoteNumber] = useState("");


async function getCandidates () {
    try {
                console.log('Running deployWithEthers script...')
        
                const currentAccount = defaultAccount; 
   
                console.log(contractAddress);
        
                const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
                let factory = new ethers.Contract(contractAddress, Ballot.abi, signer);
        
                const tx = await factory.getCandidates();

                console.log(tx); 
                console.log(tx[0]); 


                let tally = [];
                let obj = [];

                tx[1].forEach(element => tally.push(element.toNumber()));
                console.log(tally);
                
                tx[0].forEach(element => obj.push([ element,tally[tx[0].indexOf(element)] ])  );
                console.log(obj);

                console.log(Array.isArray(obj));

                setTable(obj);
                setVoteNumber("0");
                accountChangedHandler(currentAccount);
                console.log('Deployment successful.');
            } catch (e) {
                console.log(e.message)
            }   

}



// don't need to have asyn methods -- make them standard
async function deploySmartContract () {
    try {
        console.log('Running deployWithEthers script...')

        let currentAccount = defaultAccount; 

        const leaders = ["Joe Biden", "Boris Johnson", "Angela Merkel"];
        console.log(leaders);


        const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
        let factory = new ethers.ContractFactory(Ballot.abi, Ballot.bytecode, signer);

        let contract = await factory.deploy(leaders, "This is a car election");
        
        // The contract is NOT deployed yet; we must wait until it is mined
        const tx = await contract.deployed();

        setContractAddress(tx.address);

        accountChangedHandler(currentAccount);
        console.log('Deployment successful.')
    } catch (e) {
        console.log(e.message)
    }
} 


async function voteCandidate() {
    try {
        console.log('Running deployWithEthers script...')

        const currentAccount = defaultAccount; 

        console.log(contractAddress);

        const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
        let factory = new ethers.Contract(contractAddress, Ballot.abi, signer);

        console.log(parseInt(voteNumber));
        console.log(typeof parseInt(voteNumber));
        
        const tx = await factory.vote(parseInt(voteNumber));
        tx.wait();

        accountChangedHandler(currentAccount);
        console.log('Deployment successful.');
       // getCandidates();
    } catch (e) {
        console.log(e.message)
    }   

}




async function deploySmartContract () {
try {
console.log('Running deployWithEthers script...')

let currentAccount = defaultAccount; 

const leaders = ["Joe Biden", "Boris Johnson", "Angela Merkel"];
console.log(leaders);


const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
let factory = new ethers.ContractFactory(Ballot.abi, Ballot.bytecode, signer);

let contract = await factory.deploy(leaders, "This is a car election");

// The contract is NOT deployed yet; we must wait until it is mined
const tx = await contract.deployed()

setContractAddress(tx.address);

accountChangedHandler(currentAccount);
console.log('Deployment successful.')
} catch (e) {
console.log(e.message)
}

}



const connectWalletHandler = () => {

    if (window.ethereum && window.ethereum.isMetaMask) {
        console.log('MetaMask Here!');

        window.ethereum.request({ method: 'eth_requestAccounts'})
        .then(result => {
            console.log('The active account is ' + result[0]);
            accountChangedHandler(result[0]);
            setConnectButtonText('Wallet Connected to Metamask');
            getUserBalance(result[0]);
        })
        .catch(error => {
            setErrorMessage(error.message);
        
        });

    } else {
        console.log('Need to install MetaMask browser extension');
        setErrorMessage('Please install MetaMask browser extension to interact with page');
    }
}


const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
}

const getUserBalance = (address) => {
    window.ethereum.request({method: 'eth_getBalance', params:[address, 'latest']})
    .then(balance => {
        console.log(ethers.utils.formatEther(balance));
        setUserBalance(ethers.utils.formatEther(balance));
    })
}

const chainChangedHandler = () => {
    window.location.reload();
    connectWalletHandler();
}

window.ethereum.on('accountsChanged', accountChangedHandler);

window.ethereum.on('chainChanged', chainChangedHandler);

const [isproposalFormTextValid, setIsProposalTextValid] = useState(false);



 const propsalTextHandler = (event) => {

     if ((typeof event.target.value === 'string') && event.target.value) {
        setBallotProposal(event.target.value);
        setIsProposalTextValid(true);
    } else {
        setBallotProposal(null);
        setIsProposalTextValid(false);      
    }
}


const submitProposal = () => {
    console.log('Ballot Proposal Name: ', ballotProposal);
    setBallotProposal(true);
}

const cand = () => {
    console.log(table);
}

const handleChange = (e) => {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    setVoteNumber(e.target.value);
}



    return (
		<div className='Wallet'>

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#">E-Voting Dapp</Navbar.Brand>
                </Container>
            </Navbar>

            <br/> 

            <Container>

            <Card bg="light" className="text-center">
                <Card.Header>MetaMask Wallet Connection</Card.Header>
                <Card.Body>
                    <Card.Text>Account Address: {defaultAccount}</Card.Text>
                    <Card.Text>Balance: {userBalance} </Card.Text>
                    <Button variant="primary" onClick={connectWalletHandler}>{connectButtonText}</Button>
                </Card.Body>
            </Card>

            <br/> 

            <Card bg="light" className="text-center">
                <Card.Header>Add Ballot Proposal</Card.Header>
                <Card.Body>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control type="text" className="proposal" placeholder="Add proposal name here..." onChange={propsalTextHandler}/>
                   <Button variant="secondary" disabled={!isproposalFormTextValid} onClick={submitProposal}>Submit</Button> 
                    </Stack>                  
                </Card.Body>
            </Card>

            <br/> 

            <Card bg="light" className="text-center">
                <Card.Header>Add Candidates</Card.Header>
                <Card.Body>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control type="text" className="candidate" placeholder="Add candidate's name here..."/>
                   <Button variant="secondary" >Submit</Button> 
                    </Stack>                  
                </Card.Body>
            </Card>

            <br/>  
                <div className="text-center">
                    <Button onClick={deploySmartContract} variant="secondary">Deploy Smart Contract</Button>{' '}
                </div>
                <div className="text-center">{contractAddress}</div>
            <br/> 

            



            <br/>

            <Card bg="light" className="text-center">
                <Card.Header>Ballot</Card.Header>

                <br/>

                <div className="Ballot_Table">
                    <Table striped bordered hover   style={{width: 400}}>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Canididate</th>
                            <th>Vote Tally</th>
                            </tr>
                        </thead>
                        <tbody>
                        {table.map((element, index) => {
                            return (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{element[0]}</td>
                                <td>{element[1]}</td>
                                </tr>
                            );
                          })}
                        </tbody>
                    </Table>
                </div>

                <br/>  

                <div>{voteNumber}</div>

                <div>
                    <Form.Select onChange={ (e) => handleChange(e)}>
                        {table.map((element, index) => {
                            return (
                                <option key={index} value={index}>{element[0]}</option>
                            );
                          })}
                    </Form.Select>
                </div>

                <br/> 


                <div>
                    <Button variant="success" onClick={voteCandidate}>Vote</Button>{' '}
                </div>

                <br/> 
                <div>
                    <Button variant="success" onClick={getCandidates}>Get Candidates</Button>{' '}
                </div>

            <br/>
                <div>
                    <Button variant="success" onClick={cand}>tally</Button>{' '}
                </div>

                <br/> 

                

            </Card>
               

            {/*
                <div>
                    <Button onClick={addCanididate} variant="warning">Add Candidate</Button>{' '}
                </div>

                <br/> */}
                
                {errorMessage}
                </Container> 
                <br/>  
		</div>
	);
}

export default MetaMask_Wallet;
