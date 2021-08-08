import React from 'react';

import Sidebar from '../components/Sidebar'
import Chat from './Chat';

import "../css/Imessage.css";

function Imessage() {
    return (
        <div className="Imessage">
            <Sidebar />

            <Chat />
        </div>
    )
}

export default Imessage;
