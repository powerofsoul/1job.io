import Space from "./Space";
import DeviceSize from "./DeviceSize";

export const HoverableCard = `
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: ${Space.md};

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

export const SimpleContainer = `
    margin-bottom: 1rem;
    ${DeviceSize.xl} {
        padding-right: 15rem;
        padding-left: 15rem;
    }
`;