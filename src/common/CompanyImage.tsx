import styled from "styled-components"

const CompanyImage = styled.img`
    border-radius: 50%;
    max-height: 5rem;
    object-fit: cover;
    margin-right: 10px;
`;
 
export default (props: React.ImgHTMLAttributes<HTMLImageElement>) => <CompanyImage {...props}/>;