export function Toast({ toast }) {
    if (!toast) return null;

    const colors =
        toast.type === "error"
            ? "bg-read-500"
            : "bg-green-500"

    return (
        <div className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white ${colors}`}>
            {toast.message}
        </div>
    );
}