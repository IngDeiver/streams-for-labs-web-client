import React from 'react';
import WithMessage from '../hocs/withMessage';
import WithAppLayout from '../layouts/appLayout'

const Files = () => {
    return (
        <>
            Files page is the initial page
        </>
    )
}

export default WithMessage(WithAppLayout(Files))