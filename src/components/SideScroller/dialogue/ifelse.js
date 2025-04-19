const dialogueIfElse = {
    greeting_ifelse: {
        line: "Hey there, rookie. Let's talk logic.",
        options: ["What kind of logic?"],
        next: {
            "What kind of logic?": "ifElseIntro"
        }
    },

    ifElseIntro: {
        line: "In code, we make decisions using something called if/else.",
        options: ["Like what?"],
        next: {
            "Like what?": "ifElseExample"
        }
    },

    ifElseExample: {
        line: "Say you're checking a door. If it's open, you go through. Else, you wait. In code:\n\nif (doorOpen) {\n  goThrough();\n} else {\n  wait();\n}",
        options: ["Makes sense", "Can I see more?"],
        next: {
            "Makes sense": "ifElseWrap",
            "Can I see more?": "ifElseExtra"
        }
    },

    ifElseExtra: {
        line: "Here’s a video showing how if/else works in games. Opening it now...",
        options: ["Cool"],
        next: {
            "Cool": "ifElseWrap"
        },
        effect: () => {
            window.open("https://www.youtube.com/watch?v=og4ZejlIPyE", "_blank");
        }
    },

    ifElseWrap: {
        line: "If it rains, wear a coat. Else, enjoy the sun. Programming is just making choices!",
        options: ["Thanks!"],
        next: {
            "Thanks!": null
        }
    }
};

export default dialogueIfElse;
