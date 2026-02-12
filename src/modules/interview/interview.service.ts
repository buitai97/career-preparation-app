import prisma from "../../config/prisma";
import { generateFeedback, generateInterviewQuestions } from "../ai/ai.service";
import { AIFeedback } from "../ai/ai.type";

export const createSession = async (
    userId: string,
    role: string,
    resumeId?: string
) => {
    const session = await prisma.interviewSession.create({
        data: {
            userId,
            role,
            resumeId: resumeId || null,
        },
    });

    // Generate AI questions
    const questions = await generateInterviewQuestions(role);

    for (const question of questions) {
        await prisma.interviewQuestion.create({
            data: {
                sessionId: session.id,
                question,
            },
        });
    }
    return session;
};

export const addQuestion = async (
    userId: string,
    sessionId: string,
    question: string
) => {
    const session = await prisma.interviewSession.findFirst({
        where: {
            id: sessionId,
            userId,
        },
    });

    if (!session) {
        throw new Error("Session not found or unauthorized");
    }

    return prisma.interviewQuestion.create({
        data: {
            sessionId,
            question,
        },
    });
};

export const submitAnswer = async (
    userId: string,
    questionId: string,
    answer: string
) => {

    const createdAnswer = await prisma.interviewAnswer.create({
        data: {
            questionId,
            answer,
        },
    });
    const fullQuestion = await prisma.interviewQuestion.findUnique({
        where: { id: questionId },
    });

    const aiFeedback: AIFeedback = await generateFeedback(
        fullQuestion!.question,
        answer
    );
    await prisma.answerFeedback.create({
        data: {
            answerId: createdAnswer.id,
            score: aiFeedback.score,
            strengths: aiFeedback.strengths || "",
            improvements: aiFeedback.improvements || "",
        },
    });
};

export const addFeedback = async (
    userId: string,
    answerId: string,
    score: number,
    strengths: string,
    improvements: string
) => {
    const answer = await prisma.interviewAnswer.findFirst({
        where: {
            id: answerId,
            question: {
                session: {
                    userId,
                },
            },
        },
    });

    if (!answer) {
        throw new Error("Answer not found or unauthorized");
    }

    return prisma.answerFeedback.create({
        data: {
            answerId,
            score,
            strengths,
            improvements,
        },
    });
};