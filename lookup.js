import { LightningElement,track } from 'lwc';
import getData from '@salesforce/apex/Requestdata.getData';
export default class Lookupcomponent extends LightningElement {
    queryTerm;
    @track allAccounts;
    loaded=false;
    deepCopy;
    selectedAccount;
    selectedAccountId;
    handleKeyUp(evt) {
            this.queryTerm = evt.target.value;
            console.log(this.queryTerm);

            let mapped=this.deepCopy.filter((item)=>{
                if(item.Name.includes(this.queryTerm)){
                    return item;
                }
            })

            this.allAccounts=mapped;
            console.log(mapped);
    }
    handleclick(evt) {
        console.log(evt.detail);
        console.log(evt.target.value);
        console.log(evt.currentTarget.dataset.id);
        console.log(evt.currentTarget.dataset.name);
        this.selectedAccount=evt.currentTarget.dataset.name;
        this.selectedAccountId=evt.currentTarget.dataset.id;


        console.log('In the clicked Element');
        this.template.querySelector('.results').style = "display:none";
    }

    handlefocus(evt) {
        this.template.querySelector('.results').style = "display:block";
    }

    connectedCallback() {
        console.log('In the connected callback>>');
        getData()
            .then((res) => {
                let data=JSON.parse(res);    
                let reConstructed=data.map((item)=>{
                    const {Id,Name}=item;
                    return {Id,Name}
                })
                this.allAccounts=reConstructed;
                this.deepCopy=JSON.parse(JSON.stringify(reConstructed));
                console.log('DeepCopy>>>',this.deepCopy);
                console.log(this.allAccounts);
                this.loaded=true;
                
            })
            .catch((err) => {
                console.log(err);
            })

    }

}
