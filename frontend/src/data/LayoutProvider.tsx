import React, { useState } from 'react';

interface LayoutContextType {
    fabContainerRef: any;
    isLoading: boolean;
    setIsLoading: (newState: boolean) => void;
}

let LayoutContext = React.createContext<LayoutContextType>({
    fabContainerRef: null,
    isLoading: false,
    setIsLoading: () => {},
});

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const fabContainerRef = React.useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    let value = { fabContainerRef, isLoading, setIsLoading };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
    return React.useContext(LayoutContext);
}
