import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Table from "./Table";
import MobileTable from "./MobileTable";
import { useNavigate } from "react-router-dom";

function ListCustomers() {
    const headers = [
        { label: 'ID', key: 'id' },
        { label: 'Nombre', key: 'firstName' },
        { label: 'Apellido', key: 'lastName' },
        { label: 'Dirección', key: 'address' },
        { label: 'Teléfono', key: 'phone' },
        { label: 'Correo Electrónico', key: 'emailCliente' }, // New email column
        { label: 'Editar', key: 'editar' },
        { label: 'Eliminar', key: 'eliminar' }
    ];

    const [datas, setDatas] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        emailCliente: '' // New email field
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/clientes");
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setDatas(data);
            } else {
                throw new Error("Couldn't retrieve customers list");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const openEditPopup = (customer) => { // Changed to accept customer object
        setFormData(customer); // Populate formData with the selected customer
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // API to edit should go here

        closeEditPopup();

        navigate('/customers', {
            replace: true,
            state: { formData }
        });

        setFormData({
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            emailCliente: '' // Reset the email field
        });
    };

    const handleDeleteSubmit = (id) => {
        console.log(`Eliminando cliente con ID: ${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="h-auto">
            <section className="flex bg-gray-200 dark:bg-slate-600 rounded-lg w-auto">
                <div className="container px-6 py-8 mx-auto">
                    <h3 className="text-3xl font-medium text-gray-700 dark:text-white">Clientes</h3>
                    <div className="flex flex-col mt-8">
                        <Table headers={headers} datas={datas} openEditPopup={openEditPopup} handleDeleteSubmit={handleDeleteSubmit} />
                        <MobileTable datas={datas} handleDeleteSubmit={handleDeleteSubmit} openEditPopup={openEditPopup} type="cliente" />
                    </div>
                </div>
            </section>
            {isEditPopupOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-auto w-full flex justify-center items-center" id="my-modal">
                    <div className="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white dark:bg-gray-800">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Editar Cliente</h3>
                            <form onSubmit={handleEditSubmit} className="mt-2 text-left">
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="firstName">
                                        Nombre
                                    </label>
                                    <InputForm
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        placeholder="Ingrese el nuevo Nombre del cliente"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="lastName">
                                        Apellido
                                    </label>
                                    <InputForm
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        placeholder="Ingrese el nuevo Apellido del cliente"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="address">
                                        Dirección
                                    </label>
                                    <InputForm
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                        id="address"
                                        type="text"
                                        name="address"
                                        placeholder="Ingrese la nueva Dirección del cliente"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="phone">
                                        Teléfono
                                    </label>
                                    <InputForm
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        placeholder="Ingrese el nuevo Teléfono del cliente"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                                        Correo Electrónico
                                    </label>
                                    <InputForm
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-900 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Ingrese el nuevo Correo Electrónico del cliente"
                                        value={formData.emailCliente}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        id="saveChange"
                                    >
                                        Guardar Cambios
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={closeEditPopup}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListCustomers;
