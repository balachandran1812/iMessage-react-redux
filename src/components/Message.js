import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../features/userSlice';

import '../css/message.css';
import { forwardRef } from 'react';

// { 
//     timestamp, displayName, email, photo, uid, message
// }

const Message = forwardRef(({ id, contents}) => {
    const user = useSelector(selectUser);
    return (
        <div className={`message ${user.email === contents?.email && 'message__sender'}`} key={id}>
            <Avatar src={contents?.photo} className="message__photo" />
            <p>{contents?.message}</p>
            <small>{new Date(contents?.timestamp?.toDate()).toLocaleString()}</small>
        </div>
    )
})

export default Message
