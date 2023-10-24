import { useForm } from 'react-hook-form';
import { Button, Container, Dropdown, Input, TextArea } from './index'
import { useState } from 'react';
import Swal from 'sweetalert2';

const options = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Others', value: 'others' },
  ];

const BecomeAuthorForm = () => {
    const {register, handleSubmit} = useForm(); 

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = ({value}) => {
        setSelectedOption(value);
    };

    const submit = async (data) => {
        if(!selectedOption) {
            Swal.fire('Ooop! You can not select gender')
            return;
        }
        if(data.bio.length > 500) {
            Swal.fire('Your bio data should be less than 500 char.')
            return;
        }
        console.log(data, selectedOption);
    }

    return (
        <div className='py-8'>
            
                <Container>
                <h2 className='text-2xl font-medium '>Fill this form: </h2>

                <form onSubmit={handleSubmit(submit)} >
                    <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 '>
                        <Input 
                            label="Image:" 
                            placeholder='Enter your profile image' 
                            type='url' 
                            required
                            {...register('image')}
                        />

                        <Input 
                            label="Facebook Profile:" 
                            placeholder='Enter your facebook profile link' 
                            type='url' 
                            required
                            {...register('facebookLink')}
                        />

                        <Input 
                            label="Linkedin Profile:" 
                            placeholder='Enter your linkedin profile link' 
                            type='url' 
                            required
                            {...register('linkedinLink')}
                        />

                        <div className='flex gap-2'>
                            Gender: <Dropdown options={options} onSelect={handleSelect} />
                        </div>

                        <div className='lg:col-span-2 md:col-span-full'>
                            <TextArea 
                            label='About yourself:'
                            placeholder='Tell me About yourself' 
                            type='url' 
                            rows='5'
                            required
                            {...register('bio')}
                            />
                        </div>
                    </div>

                    <div className='w-full mt-5 text-center mx-auto'>
                        <Button className='lg:w-auto w-full' type="submit">Submit</Button>
                    </div>
                </form>
            </Container>
        </div> 
    );
};

export default BecomeAuthorForm;