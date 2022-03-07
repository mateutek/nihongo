import data from './data.json';
export type DataJapanese = {
    kana: string;
    kanji: string;
    romaji: string;
};

export type DataDao = Array<{
    id: string;
    japanese: DataJapanese;
    polish: string;
}>;

const questionsData: DataDao = data;

export default questionsData;
