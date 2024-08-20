import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useState } from 'react';

export default function AddEdit({ product = {}, categories = [], images = [] }) {
    // Initialize form data
    const { data, setData, post, processing, errors } = useForm({
        category_id: product?.category_id || '',
        name: product?.name || '',
        price: product?.price || '',
        description: product?.description || '',
        images: [], // Array to hold selected files
    });

    // State for handling selected image previews
    const [imagePreviews, setImagePreviews] = useState(images.map(img => `/storage/${img.path}`));

    // Handle file input changes
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Set the images in the form data
        setData('images', files);

        // Generate preview URLs for the selected images
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();

        const routeName = product.id ? 'products.update' : 'products.store';
        post(route(routeName, product.id ? [product.id] : undefined), {
            preserveScroll: true,
            forceFormData: true,  // Ensure FormData is used for the request
        });
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

                        <div>
                            <InputLabel htmlFor="images" value="Product Images" />
                            <input
                                type="file"
                                id="images"
                                multiple
                                className="mt-1 block w-full"
                                onChange={handleFileChange}
                            />
                            <InputError className="mt-2" message={errors.images} />
                        </div>

                        {imagePreviews.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-medium">Selected Images</h3>
                                <div className="grid grid-cols-3 gap-4 mt-2">
                                    {imagePreviews.map((src, index) => (
                                        <img key={index} src={src} alt={`Selected Image ${index}`} className="w-full" />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                    </form>

                    {images.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-medium">Current Images</h3>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {images.map((image, index) => (
                                    <img key={index} src={`/storage/${image.path}`} alt={`Product Image ${index}`} className="w-full" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
