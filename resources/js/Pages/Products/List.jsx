import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function List({ products }) {
    const { delete: deleteProduct } = useForm({});

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(route('products.delete', [id]));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Product list" />
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Products</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('products.create')}>
                            <FontAwesomeIcon icon={faPlus} /> Add new product
                        </Link>
                    </div>

                    <div className="mt-6">
                        <div className={'grid grid-cols-7'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Price</div>
                            <div className={'font-bold mb-3'}>Description</div>
                            <div className={'font-bold mb-3'}>Images</div>
                            <div className={'font-bold mb-3'}>Category</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {products.map((product, index) => (
                                <Fragment key={index}>
                                    <div className={'mb-2'}>{product.id}</div>
                                    <div className={'mb-2'}>{product.name}</div>
                                    <div className={'mb-2'}>{product.price}</div>
                                    <div className={'mb-2'}>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className={'mb-2'}>
                                        <div className="flex space-x-2">
                                            {product.images && product.images.map((image, imgIndex) => (
                                                <img
                                                    key={imgIndex}
                                                    src={`/storage/${image.path}`}
                                                    alt={`Product Image ${imgIndex}`}
                                                    className="w-16 h-16 object-cover"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={'mb-2'}>{product.category.name}</div>
                                    <div className={'mb-2'}>
                                        <Link href={route('products.update', [product.id])}>
                                            <FontAwesomeIcon icon={faPencil} className={'text-blue-600'} />
                                        </Link>

                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleDelete(product.id);
                                            }}
                                            className={"inline"}
                                        >
                                            <button type="submit" className={"ml-2"}>
                                                <FontAwesomeIcon icon={faTrash} className={'text-red-600'} />
                                            </button>
                                        </form>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
