import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '../Layouts/Footer.jsx';
import Navbar from '../Layouts/Navbar.jsx';
import { Fragment } from 'react';

export default function Welcome({ auth, products, categories }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleFilterChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        window.location.href = route('home', { category: selectedCategory, search: searchTerm });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="flex flex-col min-h-screen bg-amber-100">
                <img src="/storage/banner/banner2.jpg" alt="Banner" className="w-full h-[300px] md:h-screen object-cover" />
                <img src='/storage/banner/logo1.png' alt='logo' className='absolute inset-0 h-[250px] md:h-fit mx-auto md:m-auto left-0 m-4' />
                <Navbar auth={auth} />
                <main className="container flex-1 mx-auto my-4">
                    <h1 className={'text-3xl mt-6 mb-4'}>Products</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by name"
                            className="mr-4 p-2 border border-gray-300 rounded"
                        />
                        <select
                            value={selectedCategory}
                            onChange={handleFilterChange}
                            className="py-2 border border-gray-300 rounded"
                        >
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleSearchSubmit}
                            className="ml-4 p-2 bg-amber-500 text-white rounded"
                        >
                            Search
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {products.data.map((product) => (
                            <div className={'w-full p-4 bg-amber-300 border-4 border-amber-600 rounded-lg'} key={product.id}>
                                <Link href={route('products.show', product.id)} className="block">
                                    <div className="flex items-center justify-center overflow-hidden h-40">
                                        {product.images.length > 0 && (
                                            <img
                                                src={`/storage/${product.images[0].path}`}
                                                alt={product.name}
                                                className={'w-full'}
                                                height={200}
                                            />
                                        )}
                                    </div>
                                    <div className='text-lg font-bold px-2 mt-2 leading-7'>
                                        {product.name}
                                    </div>
                                    <div className={'px-2 mt-2 text-red-600 font-medium'}>
                                        #{product.category.name}
                                    </div>
                                    <div className={'px-2 mt-2 font-medium'}>
                                        &euro;{product.price}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className={'flex justify-center mt-4'}>
                        {products.links.map((link, key) => (
                            <Fragment key={key}>
                                {link.url && !link.active && (
                                    <Link className={'bg-amber-500 p-2 text-white mr-2'} href={link.url}>
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Link>
                                )}
                                {link.url && link.active && (
                                    <span className={'bg-gray-500 p-2 text-white mr-2'}>
                                        {link.label}
                                    </span>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </main>
                <div className='text-3xl'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec tellus sed enim bibendum blandit. Donec finibus urna arcu, in tempor augue sodales id. Aliquam nec neque sed felis porttitor feugiat quis eu lectus. Phasellus tristique augue quis magna vehicula efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris in dolor ut neque efficitur ultricies. Maecenas vestibulum mauris metus, tincidunt placerat nulla blandit sit amet. Quisque sed libero risus. Duis lobortis lacinia dolor non placerat. Praesent venenatis est dui, pharetra rhoncus dui malesuada id. Nulla facilisi. Sed at magna vitae enim molestie euismod nec sed tellus.

Curabitur porta urna a gravida viverra. In placerat, erat tempor porttitor pellentesque, leo neque feugiat lacus, et rhoncus nisl enim sit amet tortor. Integer convallis libero dapibus leo tincidunt convallis. Quisque consectetur, est at consequat ornare, dolor ante luctus dui, vel porta purus sapien eget tellus. Aliquam erat volutpat. Suspendisse vitae massa magna. Curabitur enim odio, tempor at ultrices nec, convallis non neque. Quisque sit amet massa interdum ipsum mattis condimentum. Nullam iaculis eget turpis id tincidunt. Proin eu sapien ligula. Suspendisse sit amet massa ac eros condimentum iaculis eget in mauris. Donec molestie pretium purus, et tempus augue vehicula ut. Praesent eu velit felis. Praesent ultricies placerat lectus sed lacinia.

Duis ut turpis a sem blandit auctor. Donec pharetra a lacus in faucibus. Quisque posuere est tincidunt felis feugiat faucibus. Vestibulum ut blandit enim, id posuere diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin sed aliquet turpis. Ut aliquam dictum enim sit amet imperdiet. Sed rhoncus lectus sem, quis dictum purus blandit ac. Pellentesque fringilla elit neque, nec pellentesque tortor tempor sit amet. Vestibulum accumsan rhoncus leo a tincidunt. Sed ut ultrices diam. Praesent dui nisi, egestas id nunc at, faucibus convallis ex. Morbi at mattis justo. Suspendisse gravida sed libero vel iaculis. Phasellus commodo molestie nisi nec varius.

Fusce laoreet bibendum dui. Nam sollicitudin, neque sit amet suscipit maximus, odio metus dignissim ex, sed pretium ante dolor et ligula. Donec sit amet volutpat felis. Vivamus pellentesque aliquet purus, sit amet elementum leo fermentum sed. Vivamus tristique laoreet quam, eget pretium est efficitur sit amet. Aenean egestas sem ac lacus hendrerit, at lobortis mi pulvinar. Proin vitae odio vel tortor lobortis tristique. In laoreet vehicula nisl, sed iaculis enim volutpat nec. Morbi eget porta nisi. Etiam pulvinar nisi non hendrerit interdum. Sed tempor nulla ut lorem euismod auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin est est, facilisis sed sem id, hendrerit sagittis dui. Pellentesque sed semper mi. Quisque non sem nisl. Vestibulum faucibus mi egestas leo cursus egestas.

Vestibulum tempus dui est, in pharetra dolor commodo vitae. Donec placerat aliquet dolor, eget finibus nunc. Nulla lacinia, tellus non congue efficitur, lectus lectus blandit nulla, sit amet blandit diam elit eu arcu. Maecenas vestibulum ante a urna laoreet blandit. Fusce posuere facilisis libero. Nunc tincidunt lectus orci, eget tempor turpis hendrerit sed. Mauris placerat arcu non nunc finibus, eget tincidunt dolor facilisis. Curabitur ipsum sem, dignissim vel arcu vitae, bibendum pulvinar libero. Sed luctus ipsum blandit consequat euismod. Nam congue justo eu massa fermentum blandit. Nulla in dictum tortor.
                </div>
                <Footer />
            </div>
        </>
    );
}
