import * as apigateway from "@pulumi/aws-apigateway";
import * as aws from "@pulumi/aws";

const f1 = new aws.lambda.CallbackFunction("f1", {
    callback: async (ev, ctx) => {
        console.log(JSON.stringify(ev));
        return {
            statusCode: 200,
            body: "goodbye one",
        };
    },
});

const f2 = new aws.lambda.CallbackFunction("f2", {
    callback: async (ev, ctx) => {
        console.log(JSON.stringify(ev));
        return {
            statusCode: 200,
            body: "goodbye two",
        };
    },
});


const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/one",
        method: "GET",
        eventHandler: f1,
    },
    {
        path: "/two",
        method: "GET",
        eventHandler: f2,
    }],
});

export const url = api.url;
