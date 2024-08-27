import {useState} from 'react';
import {Link} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Navbar({auth}) {
    const [navOpen, setNavOpen] = useState(false);

    const handleToggle = () => {
        setNavOpen(!navOpen);
    };

    return (
    <header className="sticky top-0 bg-amber-500 bg-opacity-50 backdrop-blur-sm mg:rounded-full">
        <div className="flex container mx-auto">
            <nav className="w-full relative">
                <div className="flex flex-wrap items-center justify-between p-4">
                    <Link href="/">
                        <ApplicationLogo className="w-10 h-10 fill-current text-white"/>
                    </Link>

                    <Link href="/">
                    <div className='text-3xl text-red-100 font-bold'>
                        Lagoon Pools
                    </div>
                    </Link>

                    <button
                        onClick={handleToggle}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-amber-500"
                        aria-controls="navbar-default"
                        aria-expanded={navOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        id="navbar-default"
                        className={`absolute top-full left-0 right-0 md:static md:block md:w-auto ${navOpen ? 'block' : 'hidden'} z-50`}>
                        <ul className="font-bold flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rounded-b-3xl md:rounded-full bg-amber-500 bg-opacity-50 backdrop-blur-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="block py-2 px-3 text-white rounded hover:bg-amber-400">
                                    Home
                                </Link>
                            </li>
                            {auth.user ? <>
                                <li>
                                    <Link
                                        href={route('dashboard')}
                                        className="block py-2 px-3 text-white rounded hover:bg-amber-400"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('logout')}
                                        method={"POST"}
                                        className="block py-2 px-3 text-white rounded hover:bg-amber-400"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </> : <>
                                <li>
                                    <Link
                                        href={route('login')}
                                        className="block py-2 px-3 text-white rounded hover:bg-amber-400"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('register')}
                                        className="block py-2 px-3 text-white rounded hover:bg-amber-400"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>);
}
