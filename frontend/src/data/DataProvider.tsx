import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Flashcard from '../services/flashcard';
import { DataDao, DataJapanese, SingleDataDao } from './data';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db as firebaseDB } from '../services/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';
import LS from './lowdb';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export type Answer = {
    text: string;
    clicked: boolean;
    isCorrect: boolean;
} & DataJapanese;

export type AnswersList = Array<Answer>;

export type RandomData = {
    question: Flashcard;
    answers: AnswersList;
    tries: number;
    time: number;
};

interface DataContextType {
    flashcards: Flashcard[];
    pickQuestions: (numberOfQuestions: number) => void;
    pickedFlashcards: RandomData[];
}

let DataContext = React.createContext<DataContextType>(null!);

function isCorrect(question: Flashcard, answer: Flashcard) {
    return question.back === answer.back;
}

//TODO: TMP BEFORE FIRST SELECTING CARDS;

function initializeFlashcards(data: DataDao): Flashcard[] {
    return data.map((question) => {
        const date = dayjs(Date.now()).toISOString();
        return new Flashcard(question, date);
    });
}

async function loadFlashcards() {
    const flashcardsSnapshot = await getDocs(collection(firebaseDB, 'flashcards'));
    const flashcardsData: DataDao = [];
    flashcardsSnapshot.forEach((doc) => {
        flashcardsData.push(doc.data() as SingleDataDao);
    });
    return flashcardsData;
}

function drawRandomFlashcards(flashcards: Flashcard[], numberOfQuestions: number): RandomData[] {
    const pickedFlashcards = _.sampleSize(flashcards, numberOfQuestions);
    return pickedFlashcards.map((flashcard) => {
        const questionNumber = _.random(0, 3);
        const randomData = _.sampleSize(flashcards, 3);
        randomData.splice(questionNumber, 0, flashcard);
        const answers = randomData.map((selectedAnswer) => ({
            text: selectedAnswer.back,
            ...selectedAnswer.front,
            clicked: false,
            isCorrect: isCorrect(randomData[questionNumber], selectedAnswer),
        }));
        return { question: randomData[questionNumber], answers, tries: 0, time: 0 };
    });
}

export function DataProvider({ children }: { children: React.ReactNode }) {
    let navigate = useNavigate();
    const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
        return LS.data?.flashcards ? initializeFlashcards(LS.data.flashcards) : [];
    });

    const [versionId, setVersionId] = useState<string>(() => {
        return LS.data?.versionId ? LS.data.versionId : '';
    });

    const [loadingData, setLoadingData] = useState(false);

    const [loadingFlashcards, setLoadingFlashcards] = useState(false);

    const [settings, loadingSettings] = useDocumentData(doc(firebaseDB, 'settings', 'data'));

    const [pickedFlashcards, setPickedFlashcards] = useState<RandomData[]>([]);

    useEffect(() => {
        async function doLoad() {
            if (!loadingSettings) {
                if (settings?.versionId !== versionId) {
                    //TODO: Add Notification
                    setVersionId(settings?.versionId);
                    setLoadingFlashcards(true);
                    const flashcardsData = await loadFlashcards();
                    setLoadingFlashcards(false);
                    setFlashcards(initializeFlashcards(flashcardsData));
                    saveToLS(settings?.versionId, flashcardsData);
                }
            }
        }
        doLoad();
    }, [settings, versionId, loadingSettings]);

    useEffect(() => {
        if (!loadingSettings && !loadingFlashcards) {
            setLoadingData(false);
        } else {
            setLoadingData(true);
        }
    }, [loadingSettings, loadingFlashcards]);

    const saveToLS = async (newVersionId: string, flashcardsData: DataDao) => {
        LS.data!.versionId = newVersionId;
        LS.data!.flashcards = flashcardsData;
        await LS.write();
    };

    function pickQuestions(numberOfQuestions: number) {
        const data = drawRandomFlashcards(flashcards, numberOfQuestions);
        setPickedFlashcards(data);
        navigate('/quiz');
    }

    let value = { flashcards, loadingData, pickQuestions, pickedFlashcards };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
    return React.useContext(DataContext);
}
