import _ from 'lodash';
import React, { useState } from 'react';
import Flashcard from '../services/flashcard';
import db from './lowdb';
import { DataJapanese } from './data';

export type Answer = {
    text: string;
    clicked: boolean;
    isCorrect: boolean;
} & DataJapanese;

export type AnswersList = Array<Answer>;

export type RandomData = {
    question: Flashcard;
    answers: AnswersList;
};

interface DataContextType {
    flashcards: Flashcard[];
    getRandom: () => RandomData;
}

let DataContext = React.createContext<DataContextType>(null!);

function isCorrect(question: Flashcard, answer: Flashcard) {
    return question.back === answer.back;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
    let [flashcards] = useState<Flashcard[]>(() => {
        return db.data ? db.data : [];
    });
    // const [questionNumber, setQuestionNumber] = useState(1);

    function getRandom() {
        const randomData = _.sampleSize(flashcards, 4);
        const questionNumber = _.random(0, 3);
        const answers = randomData.map((selectedAnswer) => ({
            text: selectedAnswer.back,
            ...selectedAnswer.front,
            clicked: false,
            isCorrect: isCorrect(randomData[questionNumber], selectedAnswer),
        }));
        return { question: randomData[questionNumber], answers };
    }

    let value = { flashcards, getRandom };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
    return React.useContext(DataContext);
}
