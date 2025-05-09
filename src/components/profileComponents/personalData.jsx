import { MdOutlineEdit } from 'react-icons/md';
import { Col, Row } from 'antd';
import Image from 'next/image';
import { avatarprofile } from '../assets/icons/icons2';
import { Input } from 'reactstrap';

const PersonalData = () => {
    return (
        <div className="shadow-sm p-4 overflow-hidden w-full rounded-4 bg-white">
            <div className="flex justify-end w-full">
                <button className="flex gap-2 primary-color rounded-3 bg-[#f5f5f5] px-3 py-2">
                    <span className="medium-font text-sm">Edit</span>
                    <MdOutlineEdit size={18} />
                </button>
            </div>
            <div className="flex flex-col gap-3 mb-3 w-full">
                <Col xs={24} md={12}>
                    <div className="flex flex-col gap-3 mb-3 w-full">
                        <span className="text-xl text-black semibold-font">Profile Photo</span>
                        <Image src={avatarprofile} alt='' style={{ width: '150px', height: "150px", objectFit: 'cover', borderRadius: '50%' }} />
                    </div>
                </Col>
                <Row gutter={16}>
                    <div className="w-full mb-3">
                        <span className="text-xl text-black semibold-font">Personal Data</span>
                    </div>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">Full Name</span>
                            <Input value='James Jakie' className='input_strap' readOnly />
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">Gender</span>
                            <Input value='Male' className='input_strap' readOnly />
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">Date of Birth</span>
                            <Input value='March 23, 1995 (26 y.o)' className='input_strap' readOnly />
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">Email</span>
                            <Input value='Jeromebell@gmail.com' className='input_strap' readOnly />
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">Phone Number</span>
                            <Input value='123456789' className='input_strap' readOnly />
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <div className="w-full mb-3">
                        <span className="text-xl text-black semibold-font">Personal Detail</span>
                    </div>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">Address</span>
                            <Input value='4517 Washington Ave. Manchester, Kentucky 39495' className='input_strap' readOnly />
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">City</span>
                            <Input value='XYZ' className='input_strap' readOnly />
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">State</span>
                            <Input value='XOEIKLS,' className='input_strap' readOnly />
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">Zip Code</span>
                            <Input value='XYZ' className='input_strap' readOnly />
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <div className="flex gap-2 flex-col w-full">
                            <span className="text-black regular-font">Country</span>
                            <Input value='XYZ' className='input_strap' readOnly />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default PersonalData;