export default function PublicLayout({
    children,
    auth,
}: {
    children: React.ReactNode;
    auth: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen">
            {children}
            {auth}
        </div>
    );
}