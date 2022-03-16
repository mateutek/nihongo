import dayjs from 'dayjs';
import { supermemo, SuperMemoItem, SuperMemoGrade } from './supermemo';
import { DataJapanese, SingleDataDao } from '../data/data';

export type FlashcardTextPolish = {
    text: string;
};

export type FlashcardTextJapanese = DataJapanese;

export type FlashcardText = FlashcardTextPolish | FlashcardTextJapanese;

interface IFlashcard extends SuperMemoItem {
    id: string;
    question: SingleDataDao;
    front: FlashcardTextJapanese;
    back: string;
    dueDate: string;
    practice: (grade: SuperMemoGrade) => void;
}

class Flashcard implements IFlashcard {
    back: string;
    front: FlashcardTextJapanese;
    practice(grade: SuperMemoGrade): void {
        const { interval, repetition, efactor } = supermemo(this, grade);
        this.dueDate = dayjs(Date.now()).add(interval, 'day').toISOString();
        this.repetition = repetition;
        this.efactor = efactor;
        this.interval = interval;
    }

    constructor(
        public question: SingleDataDao,
        public dueDate: string,
        public interval: number = 0,
        public repetition: number = 0,
        public efactor: number = 2.5,
    ) {
        this.id = question.id;
        this.back = question.polish;
        this.front = question.japanese;
    }

    id: string;
}

export default Flashcard;
