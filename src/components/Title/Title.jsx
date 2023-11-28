
import styled from "styled-components";

const DivWrapper = styled('div')`
	background-color: #2A2B2D;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ButtonWrapper = styled('button')`
  border: unset;
  background-color:'#27282A';
  border: 1px solid #565759;
  height: 20px;
  border-radius: 4px;
  color: '#a4a6a9';
  outline: unset;
  cursor:pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = ({SetIsShowModal}) => (

	<DivWrapper>
		<ButtonWrapper onClick={() => SetIsShowModal(true)}>Sign in</ButtonWrapper>
	</DivWrapper>
);


