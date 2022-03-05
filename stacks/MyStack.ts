import * as sst from "@serverless-stack/resources";
import {
  Auth,
  ReactStaticSite,
  Table,
  TableFieldType,
} from "@serverless-stack/resources";
import {
  UserPoolClientIdentityProvider,
  UserPoolIdentityProviderGoogle,
  ProviderAttribute,
} from "aws-cdk-lib/aws-cognito";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const prodDomainName = "nelligan.sidoine.org";

    // Table to store cards
    const table = new Table(this, "Cards", {
      fields: {
        cardId: TableFieldType.STRING,
        cardUser: TableFieldType.STRING,
        cardCode: TableFieldType.STRING,
        cardPin: TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "cardId" },
    });

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      defaultFunctionProps: {
        environment: {
          TABLE: table.tableName,
        },
        permissions: [table],
      },
      cors: true,
      routes: {
        "GET /libraries": "src/libraries.handler",
        "GET /cards": "src/cards.list",
        "POST /cards": "src/cards.add",
        "DELETE /cards/{id}": "src/cards.remove",
        "GET /cards/{id}/books": "src/books.list",
        "GET /books/{record}": "src/books.get",
        "POST /cards/{id}/books/renew": "src/books.renew",
        "GET /cards/{id}/history": "src/history.handler",
        "GET /cards/{id}/holds": "src/holds.handler",
        "POST /search": "src/search.handler",
        "POST /books/reserve/{id}": "src/reserve.handler",
      },
    });

    // Create auth
    const auth = new Auth(this, "Auth", {
      cognito: {
        userPoolClient: {
          supportedIdentityProviders: [UserPoolClientIdentityProvider.GOOGLE],
          oAuth: {
            callbackUrls: [
              scope.stage === "prod"
                ? `https://${prodDomainName}`
                : "http://localhost:3000",
            ],
            logoutUrls: [
              scope.stage === "prod"
                ? `https://${prodDomainName}`
                : "http://localhost:3000",
            ],
          },
        },
      },
    });

    if (
      !auth.cognitoUserPool ||
      !auth.cognitoUserPoolClient ||
      !process.env.GOOGLE_AUTH_CLIENT_ID ||
      !process.env.GOOGLE_AUTH_CLIENT_SECRET
    ) {
      throw new Error(
        "Please set GOOGLE_AUTH_CLIENT_ID and GOOGLE_AUTH_CLIENT_SECRET"
      );
    }

    const provider = new UserPoolIdentityProviderGoogle(this, "Google", {
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      userPool: auth.cognitoUserPool,
      scopes: ["profile", "email", "openid"],
      attributeMapping: {
        email: ProviderAttribute.GOOGLE_EMAIL,
        givenName: ProviderAttribute.GOOGLE_GIVEN_NAME,
        familyName: ProviderAttribute.GOOGLE_FAMILY_NAME,
        phoneNumber: ProviderAttribute.GOOGLE_PHONE_NUMBERS,
      },
    });

    // make sure to create provider before client (https://github.com/aws/aws-cdk/issues/15692#issuecomment-884495678)
    auth.cognitoUserPoolClient.node.addDependency(provider);

    const domain = auth.cognitoUserPool.addDomain("AuthDomain", {
      cognitoDomain: {
        domainPrefix: `${scope.stage}-nelligan-plus`,
      },
    });

    // Allow authenticated users invoke API
    auth.attachPermissionsForAuthUsers([api]);

    // Create frontend app
    const reactApp = new ReactStaticSite(this, "ReactSite", {
      path: "react-app",
      buildCommand: "yarn && yarn build",
      environment: {
        REACT_APP_REGION: this.region,
        REACT_APP_API_URL: api.url,

        REACT_APP_GA_TRACKING_ID: "UA-151729273-1",
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool.userPoolId,
        REACT_APP_USER_POOL_CLIENT_ID:
          auth.cognitoUserPoolClient.userPoolClientId,
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
        REACT_APP_USER_UI_DOMAIN: domain.domainName,
        REACT_APP_DOMAIN:
          scope.stage === "prod"
            ? `https://${prodDomainName}`
            : "http://localhost:3000",
      },
      customDomain:
        scope.stage === "prod"
          ? {
              domainName: prodDomainName,
              hostedZone: "sidoine.org",
            }
          : undefined,
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
      CognitoUserPool: auth.cognitoUserPool.userPoolId,
      CognitoUserPoolClient: auth.cognitoUserPoolClient.userPoolClientId,
      CognitoIdentityPool: auth.cognitoIdentityPoolId,
      ReactApp: reactApp.url,
    });
  }
}
