import { Toaster } from 'react-hot-toast';

export const CustomToaster = () => {
    return (
        <Toaster
            position="top-center" // 상단 가운데
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#363636 !important',
                    color: '#fff !important',
                    borderRadius: '8px !important',
                    padding: '16px !important',
                    fontSize: '16px !important',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2) !important',
                },
                success: {
                    style: {
                        background: '#4ade80',
                        borderRadius: '8px',
                        padding: '16px',
                        fontSize: '16px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                },
                error: {
                    style: {
                        background: '#ef4444',
                        borderRadius: '8px',
                        padding: '16px',
                        fontSize: '16px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                },
            }}
        />
    );
}

export default CustomToaster;