import MyStack from "./MyStack";
import * as sst from "@serverless-stack/resources";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { RemovalPolicy } from "aws-cdk-lib";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
    logRetention: RetentionDays.ONE_MONTH,
  });

  if (app.stage !== "prod") {
    app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
  }

  new MyStack(app, "app", {
    tags: {
      costcenter: "nelligan-plus",
    },
  });
}
