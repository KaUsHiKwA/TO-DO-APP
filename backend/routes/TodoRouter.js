import Router from 'express';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/taskController.js';
const router = Router();

router.get('/getTodos', getTodos);
router.post('/addTodo', addTodo);
router.put('/updateTodo', updateTodo);
router.delete('/deleteTodo', deleteTodo);

export default router;