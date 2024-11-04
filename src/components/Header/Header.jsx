import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { isAuthenticated, user, logout, loading } = useAuth();

    return (
        <header className="flex justify-between px-6 h-[56px] items-center bg-[var(--color-primary)]">
            <h1 className="text-2xl text-white font-extrabold">
                <a href="/">BienesRaices</a>
            </h1>

            <div className="flex gap-4">
                {loading ? (
                    <p className="text-white">Cargando...</p>
                ) : isAuthenticated ? (
                    <>
                        <p className="text-white">Bienvenido, {user?.nombre || user?.name}</p>
                        <a href="/admin/mis-propiedades">Mis propiedades</a>
                        <button
                            onClick={logout}
                            className="text-white hover:underline"
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <p>
                            <a href="/auth/acceder" className="text-white hover:underline">Ingresa</a>
                        </p>
                        <p>
                            <a href="/auth/crear-cuenta" className="text-white hover:underline">Crear Cuenta</a>
                        </p>
                    </>
                )}
            </div>
        </header>
    );
};

export default React.memo(Header);