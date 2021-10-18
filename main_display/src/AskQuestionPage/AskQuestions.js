//need to download react router to link to main page
//use '/ask' to access page
import styled from 'styled-components';
import PostButton from "./PostButton";


const Container = styled.div`
padding:30px 20px;
`;

const QuestionTitle = styled.input`
background:none;
border: 1px solid #aaa;
border-radius: 3px;
display: #fff;
width: 100%;
padding: 10px;
margin-bottom: 20px;
box-sizing: border-box;
`;


const QuestionTextBox= styled.textarea`
background:none;
border: 1px solid #aaa;
border-radius: 3px;
display: #fff;
width: 100%;
min-height: 200px;
box-sizing: border-box;
padding: 10px;
margin-bottom: 20px;
`;

const StyledHeader= styled.h1`
font-size: 1.8rem;
padding:10px;
`;

export default function AskQuestions() {
return(

<Container>
    <StyledHeader>Ask a question</StyledHeader>
    <QuestionTitle type = "text" placeholder="Title of your question" />
    <QuestionTextBox placeholder="Please type your question in detail.." />
    <PostButton>Post</PostButton>
</Container>

);

}