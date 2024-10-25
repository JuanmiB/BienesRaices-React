const Nav = () => {
    const navList = [
        'casa',
        'local',
        'depto',
        'cabana',
        'terreno'
    ]
    return(
        <nav className="w-full flex justify-center bg-[var(--color-primary)]">
            <ul className="container w-full flex flex-row justify-between p-5 items-center">
                {
                    navList.map(item => {
                        return(
                            <li key={item}>{item}</li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Nav