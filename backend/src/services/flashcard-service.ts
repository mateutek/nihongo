import dayjs from 'dayjs';
import { supermemo, SuperMemoItem, SuperMemoGrade } from 'supermemo';
import {Flashcard} from '@models/flashcard-model';

export function practice(flashcard: Flashcard, grade: SuperMemoGrade): Flashcard {
  const { interval, repetition, efactor } = supermemo(flashcard, grade);
  const dueDate = dayjs(Date.now()).add(interval, 'day').toISOString();

  return { ...flashcard, interval, repetition, efactor, dueDate };
}
