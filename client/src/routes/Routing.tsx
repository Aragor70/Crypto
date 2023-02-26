import React, { Fragment, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '../components/Loading';

const IndexPage = React.lazy(() => import('../pages/IndexPage'));

const Routing = () => {

    return (
        <Fragment>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                </Routes>
            </Suspense>
        </Fragment>
    )
}
export default Routing;