import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm} from '@inertiajs/react';
import {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function List({products, categories, selectedCategory}) {
    const {delete: deleteEntry} = useForm({});

    const handleDelete = (id) => {
        deleteEntry(route('products.delete', [id]), {
            onFinish: () => {
                router.reload({only: ['products']});
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Product list"/>
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Products</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('products.create')}>
                            <FontAwesomeIcon icon={faPlus}/> Add new product
                        </Link>
                    </div>

                    <div className="mt-6">
                        <div className="flex mb-4">
                            <select
                                onChange={(e) => router.get(route('products.list', {category_id: e.target.value}))}
                                value={selectedCategory || ''}
                                className="mr-4 py-2 border rounded"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>

                            {selectedCategory && (
                                <button
                                    onClick={() => router.get(route('products.list'))}
                                    className="p-2 border rounded bg-gray-200"
                                >
                                    Clear Filter
                                </button>
                            )}
                        </div>

                        <div className={'grid grid-cols-5'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Category</div>
                            <div className={'font-bold mb-3'}>Price</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {products.data.map((product, index) => {
                                return <Fragment key={index}>
                                    <div className={'mb-2'}>{product.id}</div>
                                    <div className={'mb-2'}>{product.name}</div>
                                    <div className={'mb-2'}>{product.category.name}</div>
                                    <div className={'mb-2'}>{product.price}</div>
                                    <div className={'mb-2'}>
                                        <Link href={route('products.update', [product.id])}>
                                            <FontAwesomeIcon icon={faPencil} className={'text-blue-600'}/>
                                        </Link>

                                        <Link className={"ml-2"} onClick={() => handleDelete(product.id)}>
                                            <FontAwesomeIcon icon={faTrash} className={'text-red-600'}/>
                                        </Link>
                                    </div>
                                </Fragment>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
