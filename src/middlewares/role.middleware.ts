import { Context, MiddlewareHandler, Next } from "hono";

import { actionMap, ActionType } from "@/store/role.store";

export const roleMiddleware = (actionName: ActionType): MiddlewareHandler => {
    return async (ctx: Context, next: Next) => {
        const user_type = ctx.get("user_type");

        if (!user_type) {
            return ctx.json({ error: "Unauthorized" }, 401);
        }

        const actions = actionMap[user_type as keyof typeof actionMap];
        if (!actions) {
            return ctx.json({ error: "Unauthorized" }, 401);
        }

        if (actions.includes(actionName)) {
            ctx.set("action", actionName);
        } else {
            return ctx.json({ error: "Unauthorized" }, 401);
        }

        await next();
    };
};
