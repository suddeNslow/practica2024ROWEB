import {Link, useForm} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Authenticated({children, flash}) {
    const {post} = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('logout'));
    };

    return (
    <div className="flex flex-col md:flex-row">
        <aside className={`min-h-min md:min-w-fit md:min-h-screen w-screen md:w-1/12 bg-amber-500 text-white flex flex-row md:flex-col `}>
            <Link className="flex justify-center py-2 mb-4" href="/">
                <ApplicationLogo className="w-10 h-10 fill-current text-white"/>
            </Link>
            <Link
                href={route('dashboard')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-amber-400 mb-2">
                Dashboard
            </Link>
            <Link
                href={route('categories.list')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-amber-400 mb-2">
                Categories
            </Link>
            <Link
                href={route('products.list')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-amber-400 mb-2">
                Products
            </Link>

            <div className='grow w-56 py-2 px-3 mx-auto text-white rounded mb-2'></div>
            <Link
                href={route('profile.edit')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-amber-400 mb-2">
                Profile
            </Link>
            <form
                className='w-56 mx-auto text-white mb-2' 
                onSubmit={submit}>
                <button
                    className="w-full h-full py-2 px-3 mx-auto text-white rounded hover:bg-amber-400 mb-2 text-left">
                    Logout
                </button>
            </form>
        </aside>

        {flash && flash.success && <div className={'absolute right-10 top-10 rounded-lg p-4 bg-green-400'}>{flash.success}</div>}
        {flash && flash.error && <div className={'absolute right-10 top-10 rounded-lg p-4 bg-red-400'}>{flash.error}</div>}

        <main className="flex w-5/6">
            {children}
        </main>
    </div>);
}

