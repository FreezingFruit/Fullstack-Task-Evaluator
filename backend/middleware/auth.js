import jwt from "jsonwebtoken";
import User from "../models/User";

cosnt JWT_SECRET = process.env.JWT_SECRET || 'incase-jwt-breaks-for-testing-only'