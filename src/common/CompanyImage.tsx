import styled from "styled-components"
import React from "react";

const CompanyImage = styled.img`
    border-radius: 50%;
    max-height: 5rem;
    max-width: 5rem;
    object-fit: cover;
    margin-right: 10px;
`;
 
export default (props: React.ImgHTMLAttributes<HTMLImageElement>) => <CompanyImage {...props}/>;