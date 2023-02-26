import React from 'react';
import FormSection from '../../components/FormSection';
import Header from '../../components/Header';

const IndexPage = () => {

    return (
        <article>
            <section>
                <h1>
                    The creator can encrypt your secret pictures and give you an access to the original image.
                </h1>
            </section>
            
            <FormSection
                type="Encode"
                label="Insert a picture you'd like to encrypt."
            />
            
            <FormSection
                type="Decode"
                label="Insert the encoded picture with a key to get the original picture."
            />

        </article>
    )
}
export default IndexPage;