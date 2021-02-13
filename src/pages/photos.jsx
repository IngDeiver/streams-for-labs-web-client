import React from 'react';
import '../styles/photos.css'

import WithMessage from '../hocs/withMessage';
import WithAppLayout from '../layouts/appLayout'

const Photos = () => {
    return (
        <>
            Photos page is work!
        </>
    )
}

export default WithMessage(WithAppLayout(Photos))