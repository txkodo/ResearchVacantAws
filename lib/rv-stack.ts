import * as cdk from 'aws-cdk-lib';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_node from 'aws-cdk-lib/aws-lambda-nodejs';
import type { Construct } from 'constructs';

export class ResearchVacantStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'table', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    const apiLambda = new lambda_node.NodejsFunction(this, 'ApiLambda', {
      entry: 'src/api.ts',
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    table.grantFullAccess(apiLambda);

    const apigw = new apigatewayv2.HttpApi(this, 'Apigw', {
      // xxx/hogehoge のように，後ろに'hogehoge'のようなフォールバックを付けられるようにするのがIntegration
      defaultIntegration: new integrations.HttpLambdaIntegration('default', apiLambda, {}),
    });

    new cdk.CfnOutput(this, 'ApiUrl', { value: apigw.url ?? '' });
  }
}
