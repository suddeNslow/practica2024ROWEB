import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";

export default function AddEdit({}) {
    return (
        <AuthenticatedLayout>
            <Head title='Product List'/>
            <div>
              Product List
            </div>
        </AuthenticatedLayout>
    );
}