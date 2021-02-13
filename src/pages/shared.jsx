import React from 'react';
import '../styles/shared.css'

import WithMessage from '../hocs/withMessage';
import WithAppLayout from '../layouts/appLayout'

const Shared = () => {
    return (
        <>
            Shared page is work!
        </>
    )
}

export default WithMessage(WithAppLayout(Shared))