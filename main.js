const crypto = require("crypto")

function defaultCopy(args = {}) {
    return JSON.parse(JSON.stringify(args));
}


function recursionCopy(args = {}) {
    if (typeof args !== "object") {
        return args;
    }
    const res = {}
    for (const key in args) {
        if (args.hasOwnProperty(key)) {
            res[key] = recursionCopy(args[key]);
        }
    }
    return res;
}


function createRandomObject(deepCount = 2) {
    const randomUUID = crypto.randomUUID();
    const randomKey = randomUUID[0];
    if (deepCount === 0) return randomUUID[1];
    const res = {};
    res[randomKey] = createRandomObject(deepCount - 1);
    return res;

}

function logObject(arg, space = 2) {
    console.log(JSON.stringify(arg, null, space));
}

function main() {
    const deepCount=1500;
    let randomObject = createRandomObject(deepCount);

    console.log("Start: ")
    console.time()

    const defaultCopyReplica = defaultCopy(randomObject);
    console.log("Default Replica: ")
    console.timeLog()
    // logObject(defaultCopyReplica);
    // console.log("=".repeat(50))

    randomObject = createRandomObject(deepCount);
    console.time("recursion")
    const recursionCopyReplica = recursionCopy(randomObject);
    console.log("Recursion Replica: ")
    console.timeLog("recursion")


}

main();