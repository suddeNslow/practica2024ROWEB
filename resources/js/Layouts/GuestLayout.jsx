import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Footer from './Footer.jsx'

export default function Guest({ children }) {
    return (
        <div className="min-h-screen grid grid-rows-3 place-items-center bg-amber-500 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-amber-300 dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
            <div className="w-full place-item-baseline">
                <Footer />
            </div>
        </div>
    );
}
