const WizardPresale = artifacts.require("./WizardPresale.sol");


contract('WizardPresale', function (accounts) {

    it('Execute getWizard function', async () => {
        const accounts = await web3.eth.getAccounts();

        // Create instance of contracts
        const wizard_presale = await new web3.eth.Contract(WizardPresale.abi, WizardPresale.address);

        // Execute function
        const response = await wizard_presale.methods.costToPower(1).call()
        console.log('=== response of costToPower function ===', response);  // Debug


    })
});


