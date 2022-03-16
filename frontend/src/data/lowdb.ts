import { LocalStorage, LowSync } from 'lowdb';
import lodash from 'lodash';
import questionsData, { DataDao } from './data';

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends LowSync<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

export type LocalStorageData = {
    flashcards: DataDao;
    versionId: string;
};

const adapter = new LocalStorage<LocalStorageData>('db');
const LS = new LowWithLodash(adapter);
LS.read();

function loadDefaultData() {
    const flashcards = questionsData;
    const versionId = '';
    return { flashcards, versionId };
}

LS.data ||= loadDefaultData();

export default LS;
