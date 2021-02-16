import React from 'react';
import '../styles/videos.css'

import WithMessage from '../hocs/withMessage';
import WithAppLayout from '../layouts/appLayout'

const Videos = ({ showMessage }) => {
    return (
        <>
            Videos page is work!
        </>
    )
}

export default WithMessage(WithAppLayout(Videos))