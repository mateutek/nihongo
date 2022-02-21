import {LocalStorage, LowSync} from 'lowdb';
import lodash from 'lodash';
import questionsData from './data';
import Flashcard from '../services/flashcard';
import dayjs from 'dayjs';

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends LowSync<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

const adapter = new LocalStorage<Flashcard[]>('db')
const db = new LowWithLodash(adapter);
db.read();

function loadDefaultData() {
  return questionsData.map((question) => {
    const date = dayjs(Date.now()).toISOString();
    return new Flashcard({...question.japanese}, question.polish, date)
  })
}

db.data ||= loadDefaultData();

export default db;
