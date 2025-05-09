/* eslint-disable no-unused-vars */
import { useState } from 'react';
// import { apiRequest } from '../../api/auth_api';
import { useRouter } from 'next/navigation';
import {
    Container
} from "reactstrap";

const PrivacyPolicy = () => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);

    return (
        <Container className='bg-white rounded-3 p-4 flex flex-col gap-4 w-full'>
            <div className="flex flex-col gap-2 border p-3 w-full">
                <div className="flex gap-1 items-end">
                    <h4 className="text-black text-lg mb-0 semiBold-font">01.</h4>
                    <h4 className="text-black text-lg mb-0 semiBold-font">Information Collaboration</h4>
                </div>
                <span className="regular-font color-3">Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.</span>
            </div>
            <div className="flex flex-col gap-2 border p-3 w-full">
                <div className="flex gap-1 items-end">
                    <h4 className="text-black text-lg mb-0 semiBold-font">02.</h4>
                    <h4 className="text-black text-lg mb-0 semiBold-font">Information Usage</h4>
                </div>
                <span className="regular-font color-3">Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.</span>
            </div>
            <div className="flex flex-col gap-2 border p-3 w-full">
                <div className="flex gap-1 items-end">
                    <h4 className="text-black text-lg mb-0 semiBold-font">03.</h4>
                    <h4 className="text_primary text-xl mb-0 semiBold-font">Information Security</h4>
                </div>
                <span className="regular-font color-3">Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.</span>
            </div>
            <div className="flex flex-col gap-2 border p-3 w-full">
                <div className="flex gap-1 items-end">
                    <h4 className="text-black text-lg mb-0 semiBold-font">04.</h4>
                    <h4 className="text-black text-lg mb-0 semiBold-font">Information Setting</h4>
                </div>
                <span className="regular-font color-3">Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.</span>
            </div>
            <div className="flex flex-col gap-2 border p-3 w-full">
                <div className="flex gap-1 items-end">
                    <h4 className="text-black text-lg mb-0 semiBold-font">05.</h4>
                    <h4 className="text-black text-lg mb-0 semiBold-font">Security Measures</h4>
                </div>
                <span className="regular-font color-3">Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla.</span>
            </div>
        </Container>
    );
};

export default PrivacyPolicy;
