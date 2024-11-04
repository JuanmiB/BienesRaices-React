const FormularioContacto = () => {
    return (
        <div className="flex flex-col">
            <form className="w-full  bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-6 text-center">Envíanos un mensaje</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Nombre y apellido"
                        className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Teléfono"
                        className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-md p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                    placeholder="Escribe tu mensaje aquí"
                    className="w-full border rounded-md p-3 mt-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-3 mt-6 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Contactar
                </button>
            </form>

            <small className="text-center mt-4 text-gray-600">
                Al enviar, estás aceptando los Términos y Condiciones de Uso y la Política de Privacidad.
            </small>
        </div>
    );
};


export default FormularioContacto