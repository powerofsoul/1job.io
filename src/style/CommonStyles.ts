import Space from "./Space";

export const HoverableCard = `
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: ${Space.md};

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;