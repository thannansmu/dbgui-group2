import axios from 'axios';
import React from 'react';
import CreateAccountForm from '../createAccount/CreateAccountForm';

function CreateAccount() {
    return(
        <div>
            <CreateAccountForm accountType={'tutor'}/>
        </div>
    );
}

export default CreateAccount;