import { createRouter } from "../../core/create-app";
import { createLawyerHandler, createLawyerRoute } from "./routes/create-lawyer";

export const lawyerV1Routes = createRouter()
    .openapi(createLawyerRoute, createLawyerHandler)