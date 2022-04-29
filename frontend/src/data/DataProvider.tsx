import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Flashcard from '../services/flashcard';
import { DataDao, DataJapanese, questionsTotal, SingleDataDao } from './data';
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
    skipped: boolean;
    userInput: {
        score: number;
        answer: string;
    }[];
};

interface DataContextType {
    flashcards: Flashcard[];
    pickQuestions: (numberOfQuestions: number) => void;
    pickedFlashcards: RandomData[];
    tags: string[];
    pickTags: (newTags: string[]) => void;
    pickAllTags: () => void;
    deselectAllTags: () => void;
    maxQuestions: number;
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

export function buildTags(flashcards: DataDao): Array<string> {
    const tags = flashcards.reduce((set, f) => {
        f.tags.forEach((t) => {
            set.add(t);
        });
        return set;
    }, new Set<string>());

    return Array.from(tags);
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
        return { question: randomData[questionNumber], answers, tries: 0, time: 0, skipped: false, userInput: [] };
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

    const [tags, setTags] = useState<Array<string>>(() => (LS.data?.tags ? LS.data.tags : []));
    const [maxQuestions, setMaxQuestions] = useState(() =>
        LS.data?.flashcards ? LS.data?.flashcards.length : questionsTotal,
    );

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
                    const tags = buildTags(flashcardsData);
                    await saveToLS(settings?.versionId, flashcardsData, tags);
                    setMaxQuestions(flashcardsData.length);
                } else {
                    if (LS.data?.flashcards) {
                        const tags = buildTags(LS.data.flashcards);
                        setTags(tags);
                        await saveToLS(undefined, undefined, tags);
                    }
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

    useEffect(() => {
        const filteredFlashcards = LS.data?.flashcards.filter((flashcard) => {
            return _.intersection(flashcard.tags, tags).length > 0;
        });

        if (filteredFlashcards) {
            setFlashcards(initializeFlashcards(filteredFlashcards));
            setMaxQuestions(filteredFlashcards.length);
        } else {
            setFlashcards([]);
            setMaxQuestions(0);
        }
    }, [tags]);

    const saveToLS = async (newVersionId?: string, flashcardsData?: DataDao, tags?: string[]) => {
        if (newVersionId) {
            LS.data!.versionId = newVersionId;
        }
        if (flashcardsData) {
            LS.data!.flashcards = flashcardsData;
        }

        if (tags) {
            LS.data!.tags = tags;
        }
        await LS.write();
    };

    function pickQuestions(numberOfQuestions: number) {
        const data = drawRandomFlashcards(flashcards, numberOfQuestions);
        setPickedFlashcards(data);
        navigate('/quiz');
    }

    function pickTags(newTags: string[]) {
        setTags(newTags);
    }

    function pickAllTags() {
        if (LS.data?.tags) {
            setTags(LS.data?.tags);
        }
    }

    function deselectAllTags() {
        setTags([]);
    }

    let value = {
        flashcards,
        loadingData,
        pickQuestions,
        pickedFlashcards,
        tags,
        pickTags,
        maxQuestions,
        pickAllTags,
        deselectAllTags,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
    return React.useContext(DataContext);
}
