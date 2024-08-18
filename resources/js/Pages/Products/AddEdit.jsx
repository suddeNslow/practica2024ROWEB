import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function AddEdit({ product = {}, categories = [] }) {
    console.log("Product:", product);
    console.log("Categories:", categories);
    
    const { data, setData, post, errors, processing } = useForm({
        category_id: product?.category_id || '',
        name: product?.name || '',
        price: product?.price || '',
        description: product?.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        let productRoute = product.id ? route('products.store', [product.id]) : route('products.store');
        post(productRoute);
    };

    return (
        <AuthenticatedLayout>
            <Head title={product?.id ? 'Edit Product' : 'Add Product'} />
            <div className="py-4 px-4">
                <div className="text-xl font-bold">{product?.id ? 'Edit Product' : 'Add Product'}</div>

                <div className="mt-6">
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="category_id" value="Category" />
                            <select
                                id="category_id"
                                className="mt-1 block w-full"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                required
                            >
                                <option value="">Select a Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <InputError className="mt-2" message={errors.category_id} />
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Product Name" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="price" value="Price" />
                            <TextInput
                                id="price"
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.price} />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
