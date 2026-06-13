  function Modal({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        
            <div className="w-full max-w-md rounded-xl bg-slate-900 p-6 border border-slate-800">
                
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {children}

            </div>
        </div>
    );
  }