import React, { Fragment, useContext, useState } from 'react';
import Image from '../../components/Image';
import { AsiderContext } from '../../context/AsiderContext';
import { XORContext } from '../../context/XORContext';
import download__general from '../../assets/download-outline.svg'
import download__image from '../../assets/image-outline.svg'
import download__key from '../../assets/key-outline.svg'
import aside__close from '../../assets/close-outline.svg'
import aside__hide from '../../assets/arrow-redo.svg'
import aside__open from '../../assets/arrow-undo.svg'
import { download } from './index.service';

const ConfirmationPage = ({ toggleModal }: any) => {

    const { xor, setXor } = useContext<any>(XORContext);
    const { isHidden, setIsHidden } = useContext<any>(AsiderContext);

    if (!xor || !xor?.length) return null;
    console.log(xor)

    const handleDownload = (input: any, type: string) => {

        return download(input, type);
    }

    return (
        <Fragment>
            <aside className={`aside-page${ isHidden ? "--hidden": "" }`}>
                <article>
                    <header>
                    <label onClick={() => toggleModal(false)}>
                        <span>
                            <img src={aside__close} />
                        </span>
                        <span>
                            close
                        </span>
                    </label>
                    <label onClick={() => setIsHidden(!isHidden)}>
                        <span>
                            <img src={isHidden ? aside__open : aside__hide} />
                        </span>
                        <span>
                            hide
                        </span>
                    </label>
                </header>

                {
                    !isHidden &&
                        <article>
                            <section>
                                <h1>
                                    Thank you for using the image creator.
                                </h1>
                                <p>
                                    Download the converted image and a key.
                                </p>
                            </section>
                            {
                                ( xor.length > 1 ) && (
                                    <section>
                                        <ul>
                                            <li>
                                                <ol onClick={() => handleDownload(xor, 'application/zip')}>
                                                    <li>
                                                        <img src={download__general} />
                                                    </li>
                                                    <li>
                                                        Download all
                                                    </li>
                                                </ol>
                                            </li>
                                        </ul>
                                    </section>
                                )
                            }
                            <section className="list">
                                {
                                    xor.length ? xor.map((element: any, index: number) => (
                                        <article key={index}>
                                            <label>
                                                <picture>
                                                    <Image blob={element.imageBlob} />
                                                </picture>
                                                <span>
                                                    { index + 1 }. { element.imagePath ?? "" }
                                                </span>
                                            </label>
                                            <ul>
                                                <li>
                                                    <ol onClick={() => handleDownload(element, 'image/png')}>
                                                        <li>
                                                            <img src={download__image} />
                                                        </li>
                                                        <li>
                                                            Image
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li>
                                                    <ol onClick={() => handleDownload(element.key, 'text/plain')}>
                                                        <li>
                                                            <img src={download__key} />
                                                        </li>
                                                        <li>
                                                            Key
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li>
                                                    <ol onClick={() => handleDownload([element], 'application/zip')}>
                                                        <li>
                                                            <img src={download__general} />
                                                        </li>
                                                        <li>
                                                            Download all
                                                        </li>
                                                    </ol>
                                            </li>
                                            </ul>
                                        </article>
                                    )) : "Internal Server Error. Please try again, later."
                                }
                            </section>
                        </article>
                }    
                </article>
                
                
            </aside>
        </Fragment>
    )
}
export default ConfirmationPage;