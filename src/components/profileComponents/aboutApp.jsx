/* eslint-disable no-unused-vars */
import { useState } from 'react';
// import { apiRequest } from '../../api/auth_api';
import { useRouter } from 'next/navigation';
import {
    Container
} from "reactstrap";

const AboutApp = () => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);

    return (
        <Container className='bg-white rounded-3 p-4 flex flex-col gap-4 w-full'>
            <div className="flex flex-col gap-2 w-full">
                <h4 className="text_primary text-xl mb-0 semibold-font">Terms</h4>
                <span className="regular-font color-3">Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit.</span>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <h4 className="text_primary text-xl mb-0 semibold-font">Conditions</h4>
                <span className="regular-font color-3">Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.Lorem ipsum dolor sit.</span>
            </div>
        </Container>
    );
};

export default AboutApp;
