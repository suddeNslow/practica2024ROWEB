import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function List({categories}) {
    const {delete: deleteCategory} = useForm({});

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            deleteCategory(route('categories.delete', [id]));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Category list"/>
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Categories</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('categories.create')}>
                            <FontAwesomeIcon icon={faPlus} /> Add new category
                        </Link>
                    </div>

                    <div className="mt-6">
                        <div className={'grid grid-cols-4'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Order</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {categories.map((category, index) => (
                                <Fragment key={index}>
                                    <div className={'mb-2'}>{category.id}</div>
                                    <div className={'mb-2'}>{category.name}</div>
                                    <div className={'mb-2'}>{category.order}</div>
                                    <div className={'mb-2'}>
                                        <Link href={route('categories.update', [category.id])}>
                                            <FontAwesomeIcon icon={faPencil} className={'text-blue-600'}/>
                                        </Link>

                                        <form onSubmit={(e) => { 
                                            e.preventDefault(); 
                                            handleDelete(category.id);
                                        }} className={"inline"}>
                                            <button type="submit" className={"ml-2"}>
                                                <FontAwesomeIcon icon={faTrash} className={'text-red-600'}/>
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