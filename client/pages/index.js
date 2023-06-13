import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Marquee from 'react-fast-marquee';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/state/auth/authSlice';

export default function index() {
    const [loading, setLoading] = React.useState(false);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const url = process.env.BASE_URL + '/user/getData';
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            }
        })
            .then(r => r.json())
            .then(res => {
                if (res.status) {
                    dispatch(setUserData({ userData: res.userData }));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [auth]);

    return (
        <>
            <div className=" bg-gray-700 p-2 space-y-2">
                <div className="w-full h-56 rounded overflow-hidden">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        dynamicHeight={false}
                        className="h-20">
                        <div>
                            <img
                                src="./images/dss.jpg"
                                className="h-56"
                                alt="DSS"
                            />
                            <span className="legend">Legend 1</span>
                        </div>
                        <div>
                            <img
                                src="./images/img1.png"
                                className="h-56"
                                alt="img1"
                            />
                            <span className="legend">Legend 2</span>
                        </div>
                        <div>
                            <img
                                src="./images/img2.png"
                                className="h-56"
                                alt="img2"
                            />
                            <span className="legend">Legend 3</span>
                        </div>
                    </Carousel>
                </div>
                <div className="w-full rounded overflow-hidden bg-green-100 flex p-1 space-x-2">
                    <div className="bg-white px-2 font-bold rounded">
                        <span>Updates</span>
                    </div>
                    <div className="w-full">
                        <Marquee gradient={false} className="bg-none w-full">
                            আঞ্চলিক প্রশিক্ষণ কেন্দ্র, সমাজসেবা অধিদফতর, বরিশাল
                            কর্তৃক আয়োজিত ০৬ (ছয়)দিন ব্যাপী “দফতর ব্যবস্থাপনা ও
                            ই-ফাইলিং” শীর্ষক প্রশিক্ষণ কার্যক্রম চলছে।
                        </Marquee>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <div className="w-full md:w-4/6 bg-white p-2 max-h-screen overflow-auto space-y-4 rounded-b">
                        <div className="w-full items-center justify-center flex rounded">
                            <span className="w-full p-4 text-base">
                                আঞ্চলিক প্রশিক্ষণ কেন্দ্র, সমাজসেবা অধিদফতর,
                                বরিশাল বিভাগ হলো প্রশিক্ষণ ও উন্নয়নের জন্য একটি
                                গুরুত্বপূর্ণ অংশ। এই কেন্দ্রে বিভিন্ন প্রশিক্ষণ
                                কর্মক্রম অনুষ্ঠিত হয় যা সমাজের উন্নয়নে
                                মাহত্ত্বপূর্ণ। বরিশাল বিভাগে এই প্রশিক্ষণ
                                কেন্দ্রে নবযুবক ও নবযুবতীদের কর্মবিধি ও দক্ষতা
                                উন্নত করা হয়। এই কেন্দ্রে বিভিন্ন সামাজিক ও
                                সংস্কৃতিক কর্মকাণ্ড অনুষ্ঠিত হয় যা আমাদের সমাজে
                                একতা ও সংগঠিত সমাজ গঠনে সহায়তা করে। এই
                                অধিদফতরের মাধ্যমে নাগরিকদের বিভিন্ন সেবা ও সুযোগ
                                উপলব্ধি করানো হয় যা সামাজিক উন্নয়নে
                                গুরুত্বপূর্ণ ভূমিকা পালন করে। এই কেন্দ্রে বরিশাল
                                বিভাগের প্রতিষ্ঠানের মতো বিভিন্ন সামাজিক
                                কর্মকাণ্ড অগ্রাধিকার করা হয় যা সমাজের উন্নয়নে
                                গুরুত্বপূর্ণ ভূমিকা পালন করে। এই প্রশিক্ষণ
                                কেন্দ্রে আমরা আমাদের সমাজের বিভিন্ন সমস্যা
                                সমাধানে প্রচেষ্টা করে যা সামাজিক এবং সংস্কৃতিক
                                উন্নয়নে গুরুত্বপূর্ণ অংশ। বরিশাল বিভাগের এই
                                প্রশিক্ষণ কেন্দ্র একটি গুরুত্বপূর্ণ প্রতিষ্ঠান
                                যা সমাজের উন্নয়ন এবং উন্নতির লক্ষ্যে অনুষ্ঠিত
                                হয়। এই কেন্দ্রে আমরা সমাজের বিভিন্ন সেবা ও
                                সুযোগ উন্নয়নের জন্য প্রচেষ্টা করি যা সমাজের
                                ভালবাসা এবং সম্মানের উপর ভিত্তি করে।
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-2/6 flex flex-col space-y-2">
                        <div className="w-full bg-slate-400 rounded">
                            <div className="bg-green-100 w-full items-center justify-center flex h-10 font-bold">
                                Notice Board
                            </div>
                            <div className="w-full p-2">
                                <div>Notice</div>
                                <div>Notice</div>
                                <div>Notice</div>
                                <div>Notice</div>
                            </div>
                        </div>
                        <div className="w-full bg-slate-400 rounded">
                            <div className="bg-green-100 w-full items-center justify-center flex h-10 font-bold">
                                Important Links
                            </div>
                            <div className="w-full p-2">
                                <div>Link</div>
                                <div>Link</div>
                                <div>Link</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row rounded-b overflow-hidden">
                    <div className="w-full md:w-1/2 bg-slate-100 p-2 justify-center flex flex-col">
                        <div className="w-full flex justify-center">
                            <img
                                src={
                                    process.env.BASE_URL +
                                    '/uploads/images/dss-logo.jpg'
                                }
                                className="h-20"
                            />
                        </div>
                        <div className="w-full text-center font-bold">
                            আঞ্চলিক প্রশিক্ষণ কেন্দ্র, সমাজসেবা অধিদফতর, বরিশাল
                            বিভাগ
                        </div>
                        <div className="w-full text-center text-sm text-slate-800">
                            কালীবাড়ী রোড, বরিশাল সদর, বরিশাল
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 bg-slate-100 p-2 pl-8">
                        <div className="pl-8">
                            <ul className="flex flex-col space-y-1">
                                <li className="hover:translate-x-2 transition-all duration-1000 hover:text-violet-950 text-sm">
                                    &gt;{' '}
                                    <a href="http://rtcdss.barisaldiv.gov.bd/">
                                        আঞ্চলিক প্রশিক্ষণ কেন্দ্র, সমাজসেবা
                                        অধিদফতর, বরিশাল বিভাগ
                                    </a>
                                </li>
                                <li className="hover:translate-x-2 transition-all duration-1000 hover:text-violet-950 text-sm">
                                    &gt;{' '}
                                    <a href="https://ibas.finance.gov.bd/ibas/Fixation/">
                                        অনলাইনে বেতন নির্ধারণী
                                    </a>
                                </li>
                                <li className="hover:translate-x-2 transition-all duration-1000 hover:text-violet-950 text-sm">
                                    &gt;{' '}
                                    <a href="http://barisaldiv.gov.bd/site/view/info_officers/%E0%A6%A4%E0%A6%A5%E0%A7%8D%E0%A6%AF-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A6%E0%A6%BE%E0%A6%A8%E0%A6%95%E0%A6%BE%E0%A6%B0%E0%A7%80-%E0%A6%95%E0%A6%B0%E0%A7%8D%E0%A6%AE%E0%A6%95%E0%A6%B0%E0%A7%8D%E0%A6%A4%E0%A6%BE">
                                        তথ্য প্রদানকারী কর্মকর্তাগণের তালিকা
                                    </a>
                                </li>
                                <li className="hover:translate-x-2 transition-all duration-1000 hover:text-violet-950 text-sm">
                                    &gt;{' '}
                                    <a href="http://localhost:3000/timeline/0">
                                        মানচিত্রে বরিশাল
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
