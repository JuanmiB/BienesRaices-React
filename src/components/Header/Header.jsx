const Header = () => {
    return(
        <header className="flex justify-between px-6 h-[56px] items-center bg-[var(--color-primary)]">
            <h1 className="text-2xl text-white font-extrabold"><a href="/">BienesRaices</a></h1>

            <div className="flex gap-4">
                {/* Elementos 'a' que conducen a esas paginas */}
                <p>Ingresa</p>
                <p>Crear Cuenta</p>
            </div>
        </header>
    )
}

export default Header