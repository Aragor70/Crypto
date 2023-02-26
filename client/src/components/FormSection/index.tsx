import React, { useContext, useState } from 'react';
import { AsiderContext } from '../../context/AsiderContext';
import { XORContext } from '../../context/XORContext';
import ApiService, { PayloadProps } from '../../services/ApiService';
import Header from '../Header';

interface FormSectionProps {
    type: string,
    label: string
}

const FormSection = ({ type, label }: FormSectionProps) => {

    const { xor, setXor } = useContext<any>(XORContext);
    const { isHidden, setIsHidden } = useContext<any>(AsiderContext);

    const [ formData, setFormData ] = useState<PayloadProps>({
        image: null
    });

    const handleChange = (e: any): void => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
    const [errorMessage, setErrorMessage] = useState<null | string>(null);

    const handleSubmit = async () => {
        if (!formData.image) return // handle form error
        
        const payload: FormData = new FormData();
        payload.append('image', formData.image);
        if (formData.key) payload.append('key', formData.key);
        const res: any = await ApiService.transform(formData);

        if (typeof res === "string") {
            setErrorMessage(res);
            setXor([]);
            return setIsHidden(false);
        }
        setXor([...xor, res]);
        setIsHidden(false);
    }

    return (
        <section>
            <Header title={type} center={true} />
            <p>{label}</p>

            <label>
                <span>
                    Image
                </span> 
                <input type="file" name="image" onChange={handleChange} />
            </label>

            {
                type === "Decode" && (
                    <label>
                        <span>
                            Key
                        </span>
                        <input type="file" name="key" onChange={handleChange} />
                    </label>
                )
            }
            
            {
                !!(errorMessage) && <p style={{ color: 'red' }}>{errorMessage}</p>
            }
            <div>
                <button>reset</button>
                <button onClick={handleSubmit} disabled={(
                    (type === "Decode") ?
                        (!(formData.image && formData.key) ? true : false) :
                        (!formData.image ? true : false)
                )}>submit</button>
            </div>
            
        </section>

    );
}
export default FormSection;