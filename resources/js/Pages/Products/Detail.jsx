import React, { useEffect } from 'react';
import Navbar from '@/Layouts/Navbar';  
import Footer from '@/Layouts/Footer';  
import { Link } from '@inertiajs/react';

const Detail = ({ product = {}, auth = {} }) => {
    const { name = 'No name available', description = 'No description available', images = [] } = product;

    useEffect(() => {
        document.title = name; // Set the title to the product name
    }, [name]);

    return (
        <div className="flex flex-col min-h-screen bg-amber-100">
            <Navbar auth={auth} />
            <main className="container flex-1 mx-auto p-4">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold mb-2">{name}</h1>
                    <p className="text-lg mb-4">{description}</p>
                    <div>
                        {images.length > 0 ? (
                            images.map((image) => (
                                <img
                                    key={image.id}
                                    src={`/storage/${image.path}`}
                                    alt={name}
                                    className="w-full mb-4"
                                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Detail;