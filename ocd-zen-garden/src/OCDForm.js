import React, {useState} from 'react';

function OCDForm() {
    return (
        <div>
            <div style={{fontSize: '1em'}}>
                <p style={{fontSize: '1em', fontWeight: '600'}}>Hey there! It looks like you may have gotten lost in the garden.</p>
                <br/>
                <p style={{fontSize: '.7em'}}>When I created this site I wanted to be certain that I wasn't creating something that 
                   could become a true compulsion rather than a tool to give a quick sense of control and order to the user. 
                   When I was young I had severe OCD and struggled all through my childhood. I would never forgive myself if 
                   something I created made someone else's similar struggles worse. As a result this site has a built-in timer that only 
                   allows a certain number of organizations within a certain period of time. If you're seeing this message the organization 
                   functionality of the site will be locked for your IP address/user credentials for the next hour. This will happen every time this limit is reached. 
                   Users who have created an account (totally free, with no spam emails) can override the counter system by taking one of the following steps:</p>
            </div>
               <ul style={{fontSize: '.6em'}}>
                   <li>Fill out <em><strong>this form</strong></em> that will search your local area for psychologists specially trained to assist with Obsessive Compulsive Disorder.
                       This will disable the counter for one month. After that, if you choose to get treatment and your psychologist emails us that you are receiving treatment
                       (or have already been receiving treatment), the timer will be set for twice the amount of time and the lockout period will only be set for a half hour.
                   </li>
                   <br />
                   <li>If you're already receiving treatment for OCD and your psychologist believes overuse of this website can take the place of more destructive
                       compulsions or otherwise believes it is a useful tool in your treatment, they can email us using this link: (TBD). Once approved the timer will 
                       be permanently disabled
                   </li>
               </ul>
        </div>
    )
}

export default OCDForm;