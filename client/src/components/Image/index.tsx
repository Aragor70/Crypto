import React from 'react';

const Image = ({ blob }: any) => <img src={`data:image/jpeg;base64,${blob}`} />


export default Image;