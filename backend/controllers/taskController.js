import Task from '../models/task.js';

export async function addTodo(req, res) {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ msg: "Todo cannot be empty" });
        }

        if (Task.findOne({ title: title })) {
            return res.status(400).json({ msg: "todo already exists" });
        }

        const todo = new Task({ title, userId: req.userId });

        await todo.save();

        res.status(201).json({ msg: "Todo saved successfully" });
    } catch (e) {
        console.error("Error saving todo:", e);
        res.status(500).json({ msg: "Server error. Please try again." });
    }
}

export async function updateTodo(req, res) {
    try {
        const { title, status, _id } = req.body;

        const todo = await Task.findById(_id);

        if (!todo) {
            return res.status(400).json({ msg: "todo not found" });
        }
        todo.title = title;
        todo.status = status;
        await todo.save();
        res.status(200).json({ msg: "Todo updated successfully" });
    } catch (e) {
        console.error("Error updating todo:", e);
        res.status(500).json({ msg: "Server error. Please try again." });
    }
}

export async function deleteTodo(req, res) {
    try {
        const id = req.body._id;

        const todo = await Task.findById(id);
        if (!todo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        const result = await Task.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(500).json({ msg: "Failed to delete todo" });
        }

        res.status(200).json({ msg: "Todo deleted successfully" });

    } catch (e) {
        console.error("Error deleting todo:", e);
        res.status(500).json({ msg: "Server error. Please try again." });
    }

}

export async function getTodos(req, res) {
    try {
        const { userId } = req.body;

        const todos = await Task.find({ userId: userId });

        if (!todos) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.status(200).json({ todos });
    } catch (e) {
        res.status(500).json({ msg: "Server error. Please try again." });
    }
}

