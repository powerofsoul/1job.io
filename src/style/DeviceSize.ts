export const size = {
    xs: '320px',
    sm: '425px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
}

export default {
    xs: `@media (min-width: 0)`,
    sm: `@media (min-width: ${size.sm})`,
    md: `@media (min-width: ${size.md})`,
    lg: `@media (min-width: ${size.lg})`,
    xl: `@media (min-width: ${size.xl})`,
};

