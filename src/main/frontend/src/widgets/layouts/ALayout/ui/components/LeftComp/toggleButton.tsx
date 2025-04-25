
interface ToggleButtonProps {
    isCollapsed: boolean,
    onToggle: () => void,
}

export const ToggleButton = ({ isCollapsed, onToggle }: ToggleButtonProps) => {
    return (
        <>
            <button 
                onClick={onToggle}
                className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-md z-15 focus:outline-none hover:bg-gray-50"
                aria-label={isCollapsed ? "메뉴 펼치기" : "메뉴 접기"}
            >
                {isCollapsed ? (
                <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                ) : (
                <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                )}
            </button>
        </>
    )
}
export default ToggleButton;
