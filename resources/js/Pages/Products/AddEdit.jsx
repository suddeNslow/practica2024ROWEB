import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";

export default function AddEdit({product}) {
    return (
        <AuthenticatedLayout>
            <Head title={product ? 'Edit category' : 'Add category'}/>
            <div>
              {product ? 'Edit category' : 'Add category'}
            </div>
        </AuthenticatedLayout>
    );
}
