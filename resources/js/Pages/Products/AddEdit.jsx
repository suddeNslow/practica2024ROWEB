import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import FileInput from "@/Components/FileInput.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function AddEdit({categories, product}) {
    const {data, setData, post, errors, processing} = useForm({
        name: product?.name || '',
        description: product?.description || '',
        category: product?.category_id || '',
        price: product?.price || '',
        images: [],
        deleted_images: []
    });

    const [currentImages, setCurrentImages] = useState(product?.images || []);
    const [newImagePreviews, setNewImagePreviews] = useState([]);

    const submit = (e) => {
        e.preventDefault();

        let productRoute = product ? route('products.store', [product.id]) : route('products.store');
        post(productRoute);
    };

    const deleteProductImage = (id) => {
        let updatedImages = currentImages.filter(function (obj) {
            return obj.id !== id;
        });
        setCurrentImages(updatedImages);
        setData('deleted_images', [...data.deleted_images, id]);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [...data.images, ...files];  // Append new images to existing ones
        setData('images', newImages);

        const previews = files.map((file) => {
            return URL.createObjectURL(file);
        });
        setNewImagePreviews([...newImagePreviews, ...previews]);  // Append new previews to existing ones
    };

    const deleteNewImage = (index) => {
        const updatedImages = [...data.images];
        const updatedPreviews = [...newImagePreviews];

        updatedImages.splice(index, 1);  // Remove the selected image from the array
        updatedPreviews.splice(index, 1);  // Remove the corresponding preview

        setData('images', updatedImages);
        setNewImagePreviews(updatedPreviews);
    };

    return (
        <AuthenticatedLayout>
            <Head title={product ? 'Edit product' : 'Add product'}/>
            <div className={'w-full'}>
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>{product ? 'Edit product' : 'Add product'}</div>

                    <div className="mt-6">
                        <form onSubmit={submit} encType='multipart/form-data' className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name"/>

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                />

                                <InputError className="mt-2" message={errors.name}/>
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description"/>

                                <TextInput
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />

                                <InputError className="mt-2" message={errors.description}/>
                            </div>

                            <div>
                                <InputLabel htmlFor="category" value="Category"/>

                                <SelectInput
                                    id="category"
                                    className="mt-1 block w-full"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    required
                                    options={categories}
                                />

                                <InputError className="mt-2" message={errors.category}/>
                            </div>

                            <div>
                                <InputLabel htmlFor="price" value="Price"/>

                                <TextInput
                                    id="price"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />

                                <InputError className="mt-2" message={errors.price}/>
                            </div>

                            {/* Conditionally render the Existing Images section */}
                            {currentImages.length > 0 && (
                                <div>
                                    <InputLabel htmlFor="existing_images" value="Existing images"/>

                                    <div className={'grid grid-cols-6'}>
                                        {currentImages.map((image) => (
                                            <div className={'p-2 relative'} key={image.id}>
                                                <img alt={''} src={`/storage/${image.path}`} width={200} height={200}/>
                                                <FontAwesomeIcon onClick={() => deleteProductImage(image.id)}
                                                                 icon={faTrash} className={'text-red-600 ml-2 absolute top-0 right-0 cursor-pointer'}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <InputLabel htmlFor="images" value="Images"/>

                                <FileInput
                                    id="images"
                                    className="mt-1 block w-full"
                                    multiple={true}
                                    onChange={handleImageChange}
                                />

                                <InputError className="mt-2" message={errors.images}/>
                            </div>

                            {newImagePreviews.length > 0 && (
                                <div>
                                    <InputLabel htmlFor="new_images" value="New Images"/>
                                    <div className={'grid grid-cols-6'}>
                                        {newImagePreviews.map((preview, index) => (
                                            <div className={'p-2 relative'} key={index}>
                                                <img alt={''} src={preview} width={200} height={200}/>
                                                <FontAwesomeIcon onClick={() => deleteNewImage(index)}
                                                                 icon={faTrash} className={'text-red-600 ml-2 absolute top-0 right-0 cursor-pointer'}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
