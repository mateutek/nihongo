import { LocalStorage, LowSync } from 'lowdb';
import lodash from 'lodash';
import questionsData, { DataDao } from './data';
import { buildTags } from './DataProvider';

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends LowSync<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

export type LocalStorageData = {
    flashcards: DataDao;
    tags: string[];
    versionId: string;
};

const adapter = new LocalStorage<LocalStorageData>('db');
const LS = new LowWithLodash(adapter);
LS.read();

export function loadDefaultData() {
    const flashcards = questionsData;
    const versionId = '';
    const tags = buildTags(questionsData);
    return { flashcards, versionId, tags };
}

LS.data ||= loadDefaultData();

export default LS;
