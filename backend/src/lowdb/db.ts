import lodash from 'lodash';
import {JSONFile, Low} from 'lowdb';

type Post = {
  id: number;
  title: string;
}

type Data = {
  posts: Post[]
}

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

const adapter = new JSONFile<Data>('db.json')
const low = new LowWithLodash(adapter)
// await low.read()

// Instead of db.data use db.chain to access lodash API
const post = low.chain
  .get('posts')
  .find({ id: 1 })
  .value() // Important: value() must be called to execute chain
