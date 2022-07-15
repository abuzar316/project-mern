import Styled from "styled-components";

export const Input = Styled.input`
    padding:8px 15px;
    width:100%;
    margin: 7px 0; 
    border:none;
    outline:none;
    border-bottom:1px solid #0096a3;
    &:focus{
        border-bottom:2px solid #0096a3;
    }
`;

export const Button = Styled.button`
    border: none;
    outline:none;
    font-weight: 500;
    font-size:18px;
    padding: 7px 15px;
    border-radius:5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
    background-color: #0096a3;
    color: #FFFFFF;
    &:hover{
        background-color: #fff;
        color: #0096a3;
    }
`;

export const SpanError = Styled.span`
    font-size:12px;
    color:red;
`;