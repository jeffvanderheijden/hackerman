const dialogue = {
    greeting_boss: {
        line: "HAHAHAHA! I told you I'd be back.",
        options: ["You're that bug from before!"],
        next: {
            "You're that bug from before!": "explanation_boss"
        }
    },
    explanation_boss: {
        line: "That's right! You've done well to avoid my smaller bugs so far. But let's test those developer skills of yours..",
        options: ["Fine!"],
        next: {
            "Fine!": "boss_question1"
        }
    },
    boss_question1: {
        line: "What is a variable in programming?",
        options: [
            "A container to store data",
            "A fancy name for a function",
            "A bug in your code"
        ],
        next: {
            "A container to store data": "boss_question2",
            "A fancy name for a function": "wrong1",
            "A bug in your code": "wrong1"
        }
    },

    wrong1: {
        line: "Wrong! I knew that robot Byte couldn't teach you anything useful!",
        options: ["Next question."],
        damage: 25,
        next: {
            "Next question.": "boss_question2"
        }
    },

    boss_question2: {
        line: "How do we make decisions in code?",
        options: [
            "If/Else statements",
            "Using console.log",
            "Jumping over bugs"
        ],
        next: {
            "If/Else statements": "boss_question3",
            "Using console.log": "wrong2",
            "Jumping over bugs": "wrong2"
        }
    },

    wrong2: {
        line: "Hahahaha, wrong! Last question..",
        options: ["Final question."],
        damage: 25,
        next: {
            "Back to question": "boss_question3"
        }
    },

    boss_question3: {
        line: "What is a loop useful for?",
        options: [
            "Repeating code multiple times",
            "Making the game lag",
            "Decorating your code"
        ],
        next: {
            "Repeating code multiple times": "boss_defeated",
            "Making the game lag": "wrong3",
            "Decorating your code": "wrong3"
        }
    },

    wrong3: {
        line: "Tsk tsk! Didn't you learn *anything* from that last robot?",
        options: ["Try again."],
        damage: 25,
        next: {
            "Try again.": "boss_question3"
        }
    },

    boss_defeated: {
        line: "Nooo! Impossible... You actually learned something...",
        options: ["Escape the program"],
        next: {
            "Escape the program": null
        }
    }
};

export default dialogue;
