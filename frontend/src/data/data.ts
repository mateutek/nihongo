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
};

export type DataDao = Array<SingleDataDao>;

const questionsData: DataDao = data;

export default questionsData;
export const questionsTotal = questionsData.length;
