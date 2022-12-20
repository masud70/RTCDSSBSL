import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CiTextAlignJustify } from 'react-icons/ci';

export default function Navbar() {
    const ToggleClass = () => {
        var element = document.getElementById('toggleDiv');
        element.classList.toggle('hidden');
    };

    return (
        <>
            <div className="h-24 md:h-32">
                <div className="bg-purple-400 md:h-16 sm:h-10 px-6">
                    <div className="w-1/4 h-full float-left flex items-center justify-left">
                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                width={200}
                                height={500}
                                alt="Logo"
                            />
                        </Link>
                    </div>
                    <div className="right w-3/4 h-full float-right">
                        <ul className="list-none flex float-right text-slate-100 space-x-4 items-center h-full font-semibold sm:hidden md:flex">
                            <li className="hover:bg-slate-500 hover:rounded duration-500 px-2 py-1">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="hover:bg-slate-500 hover:rounded duration-500 px-2 py-1">
                                <Link href="/trainee-list">Trainee List</Link>
                            </li>
                            <li className="hover:bg-slate-500 hover:rounded duration-500 px-2 py-1">
                                <Link href="/trainee-management">
                                    Trainee Management
                                </Link>
                            </li>
                            <li className="hover:bg-slate-500 hover:rounded duration-500 px-2 py-1">
                                <Link href="sms-history">SMS History</Link>
                            </li>
                            <li className="hover:bg-slate-500 hover:rounded duration-500 px-2 py-1">
                                <Link href="login">Login</Link>
                            </li>
                        </ul>
                        <div className="float-right flex items-center h-full md:hidden">
                            <button>
                                <CiTextAlignJustify
                                    onClick={() => ToggleClass()}
                                    className="font-bold text-white text-3xl"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="md:h-16 sm:h-14 px-6">
                    <div className="text-center flex justify-between w-full items-center h-full">
                        <div>
                            <Image
                                className="max"
                                src="/images/logo-bd.png"
                                height={50}
                                width={45}
                                alt="Logo"
                            />
                        </div>
                        <div className="font-bold text-xl md:text-2xl">
                            আঞ্চলিক প্রশিক্ষন কেন্দ্র, সমাজসেবা অধিদফতর, বরিশাল।
                        </div>
                        <div>
                            <Image
                                className="max"
                                src="/images/dss-logo.jpg"
                                height={50}
                                width={45}
                                alt="Logo"
                            />
                        </div>
                    </div>
                </div>
                <div id="toggleDiv" className="hidden md:hidden z-50 px-6">
                    <ul className="float-right z-100 text-center space-y-2 rounded-b-md text-slate-100 font-semibold bg-gray-400 p-2">
                        <li className="hover:bg-gray-800 px-2 py-1 rounded duration-500">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="hover:bg-gray-800 px-2 py-1 rounded duration-500">
                            <Link href="/trainee-list">Trainee List</Link>
                        </li>
                        <li className="hover:bg-gray-800 px-2 py-1 rounded duration-500">
                            <Link href="/trainee-management">
                                Trainee Management
                            </Link>
                        </li>
                        <li className="hover:bg-gray-800 px-2 py-1 rounded duration-500">
                            <Link href="sms-history">SMS History</Link>
                        </li>
                        <li className="hover:bg-gray-800 px-2 py-1 rounded duration-500">
                            <Link href="login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
