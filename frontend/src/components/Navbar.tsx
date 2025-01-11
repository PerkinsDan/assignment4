function App() {
    const pages = [
        { name: "Activities", href: "/activities" },
        { name: "Boats", href: "/boats" },
        { name: "Instructors", href: "/instructors" },
    ];

    return (
        <>
            <nav className="flex items-center my-4">
                <a className="text-3xl" href="/">
                    DBMS
                </a>
                <div className="divide-x">
                    {pages.map(({ name, href }) => {
                        return (
                            <a
                                className="px-8 text-center"
                                key={name}
                                href={href}
                            >
                                {name}
                            </a>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}

export default App;
