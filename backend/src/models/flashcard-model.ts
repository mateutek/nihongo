import {SuperMemoItem} from 'supermemo';

export interface Flashcard extends SuperMemoItem {
  front: string;
  back: string;
  dueDate: string;
}
