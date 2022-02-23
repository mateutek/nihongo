import { Router } from 'express';
import { adminMw } from './middleware';
import authRouter from './auth-router';
import userRouter from './user-router';
import flashcardRouter from '@routes/flashcard-router';


// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', adminMw, userRouter);
apiRouter.use('/flashcard', adminMw, flashcardRouter);

// Export default
export default apiRouter;
