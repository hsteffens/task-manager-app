import { UUID } from "crypto";
import { Router } from "express";

const router = Router();

type UserStatus = 'pending' | 'in-progress' | 'completed';

export interface User {
    id: UUID;
    userId: UUID;
    title: string;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

const users = new Map<UUID, User>();

router.post("/", async (req, res) => {
    const { id, userId, title, status, createdAt, updatedAt } = req.body as User;
  
    if (users.has(id)) {
      return res.status(400).json({ error: "User already exists with this id" });
    }
  
    const user: User = { id, userId, title, status, createdAt, updatedAt };
    users.set(id, user);
  
    res.status(201).json(user);
  });
  
  // List all users
  router.get("/", async (_, res) => {
    res.json(Array.from(users.values()));
  });
  
  // Delete a user
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!users.has(id as UUID)) {
      return res.status(404).json({ error: "User not found" });
    }
  
    users.delete(id as UUID);
    res.status(204).send();
  });
  
  export default router;
