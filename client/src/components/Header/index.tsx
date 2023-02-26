import React, { Fragment, useState } from 'react';

import styles from './index.module.scss';

const Header = ({ title, center = false }: { title: string, center?: boolean }) => {

    const [ pathname, setPathname ] = useState("")
    
    return (
        <Fragment>
            <header className={styles.header}>
                <article>
                    <h3>
                        <span>{title}</span>
                    </h3>
                </article>
            </header>
        </Fragment>
            
    );
}
export default Header;