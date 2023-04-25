import React from 'react';
import {CreateAccountForm} from '../createAccount';
import { useState } from 'react';

export const CreateAccount = () => {

    const [accountType, setAccountType] = useState("");
    const [accountTypeSelected, setAccountTypeSelected] = useState(false);

    const renderCreateAccountForm = (accountTypeInput) => {
        setAccountType(accountTypeInput);
        setAccountTypeSelected(true);
    };

    if(!accountTypeSelected){
        return<>
        <div className='accountTypeSelection'>
            <h2 style={{marginTop: '1rem'}}>I'm a...</h2>
            <div className='container' id='accountTypeContainer'>
                <button className='createAccount-accountType' onClick={() => renderCreateAccountForm('student')}>Student</button>
                <button className='createAccount-accountType' onClick={() => renderCreateAccountForm('tutor')}>Tutor</button>
            </div>
        </div>
    </>
    }

    else{
        return<>
        <CreateAccountForm accountType={accountType}/>
    </>
    }

};