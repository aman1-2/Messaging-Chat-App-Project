export const Auth = ({ children }) => {
    // Layout for Auth Related Pages
    return (
        <div
            className="h-screen flex items-center justify-center bg-slack"
        >
            <div
                className="mid:h-auto md:w-[420px]"
            >
                {children}
            </div>

        </div>
    );
};