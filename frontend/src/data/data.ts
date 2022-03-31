import data from './data.json';
export type DataJapanese = {
    kana: string;
    kanji: string;
    romaji: string;
};

export type SingleDataDao = {
    id: string;
    japanese: DataJapanese;
    polish: string;
    tags: string[];
};

export type QuizHistoryItem = {
    question: SingleDataDao;
    owner: string;
    tries: number;
    time: number;
    score: number;
    skipped: boolean;
    userInput: string[];
    answers: {
        text: string;
        isCorrect: boolean;
        clicked: boolean;
    }[];
};

export type DataDao = Array<SingleDataDao>;

const questionsData: DataDao = data;

export default questionsData;
export const questionsTotal = questionsData.length;
