import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { AsiderContext } from '../context/AsiderContext';
import { XORContext } from '../context/XORContext';
import ConfirmationPage from '../pages/ConfirmationPage';
import Routing from '../routes/Routing';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
    
    const { xor, setXor } = useContext<any>(XORContext);
    const { isHidden, setIsHidden } = useContext<any>(AsiderContext);

    const toggleModal = (value?: boolean | "hidden") => {
        
        if (value === false) {
            setIsHidden(false)
            return setXor([])
        }
        return setIsHidden(!!value)
    }

    return (
        <Fragment>
            <Header title={"Image creator"} />
            <main>
                <Routing />

                {
                    ((xor && xor.length) && !isHidden) ? <div className="shadow" onClick={() => setIsHidden(true)}></div> : null
                }
                {
                    (xor && xor.length) ? <ConfirmationPage toggleModal={toggleModal} isHidden={isHidden} setIsHidden={setIsHidden} /> : null
                }
            </main>
            <Footer />
        </Fragment>
    )
}
export default Layout;