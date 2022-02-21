import _ from "lodash";
import React, { useEffect } from "react";
import Flashcard from "../services/flashcard";
import db from "./lowdb";
import { DataJapanese } from "./data";

export type Answer = {
  text: string,
  clicked: boolean,
  isCorrect: boolean
} & DataJapanese

export type AnswersList = Array<Answer>;

export type RandomData = {
  question: Flashcard,
  answers: AnswersList
}

interface DataContextType {
  userData: Flashcard[];
  getRandom: () => RandomData;
}

let DataContext = React.createContext<DataContextType>(null!);

function isCorrect(question: Flashcard, answer: Flashcard) {
  return question.back === answer.back;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  let [userData, setUserData] = React.useState<Flashcard[]>([]);

  useEffect(() => {
    const initialData = db.data ? db.data : [];
    setUserData(initialData);
  }, []);

  function getRandom() {
    const randomData = _.sampleSize(userData, 4);
    const questionNumber = _.random(0, 3);
    const answers = randomData.map((selectedAnswer) => ({
      text: selectedAnswer.back, ...selectedAnswer.front,
      clicked: false,
      isCorrect: isCorrect(randomData[questionNumber], selectedAnswer)
    }));
    return { question: randomData[questionNumber], answers };
  }

  let value = { userData, getRandom };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}


export function useData() {
  return React.useContext(DataContext);
}
