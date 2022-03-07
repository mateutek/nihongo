import React from 'react';

interface LayoutContextType {
    fabContainerRef: any;
}

let LayoutContext = React.createContext<LayoutContextType>({
    fabContainerRef: null,
});

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const fabContainerRef = React.useRef(null);

    let value = { fabContainerRef };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
    return React.useContext(LayoutContext);
}
