import React from "react";
import styled from "styled-components";
import Twemoji from "react-twemoji";

const Element = styled.div`
  margin: 5px;
  border: 2px solid #078373;
  background: #04AB95;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: #ffffff;
  p{
    margin: 0;
  }
  display: flex;
  div:nth-of-type(1){
    flex-grow: 1;
  }
  div:nth-of-type(2){
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: column;
    img{
      height: 25px;
    }
  }
`
const Badge = styled.div`
  background: #0DCEB4;
  border-radius: 10px;
  color: white;
  display: inline;
  height: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-right: 10px;
`
const SemiTransparent = styled.span`
  opacity: 0.65;
`

type Quiz = {
  name: String,
  desc: String,
  likes: Number,
  doneCounter: Number,
  author: {
    username: String
  },
  category:  {
    name: String,
    icon: String
  },
  accepted: Boolean,
  emojis: [{emoji: String, desc: String}],
  createdAt: Date
};

function QuizListEntry({quiz} : any){
  let q = (quiz as Quiz);
  return (
    <Element>
      <div>
        <Badge>{q.category.name}</Badge>
        <SemiTransparent>Quiz by</SemiTransparent> {q.author.username}
        <div>
          <p>Name: {q.name}</p>
          <p>Desc: {q.desc}</p>
        </div>
      </div>
      <Twemoji>
        {q.emojis.map(emoji => (
          <>{emoji.emoji}</>
        ))}
      </Twemoji>
    </Element>
  )
}

export default QuizListEntry;