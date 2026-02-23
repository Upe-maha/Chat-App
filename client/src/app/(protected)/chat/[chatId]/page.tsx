export default async function ChatRoomPage({
    params,
}: {
    params: Promise<{ chatId: string }>;
}) {
    const { chatId } = await params;

    return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-primary">💬 Chat Room</h1>
                <p className="mt-2 text-muted-foreground">
                    Chat ID: <code className="rounded bg-secondary px-2 py-1 text-sm">{chatId}</code>
                </p>
            </div>
        </div>
    );
}