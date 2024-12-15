import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_node from 'aws-cdk-lib/aws-lambda-nodejs';

export class ResearchVacantStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiLambda = new lambda_node.NodejsFunction(this, 'ApiLambda', {
      entry: 'src/api.ts',
      runtime: lambda.Runtime.NODEJS_20_X,
    });

    const apigw = new apigatewayv2.HttpApi(this, 'Apigw', {
      // xxx/hogehoge のように，後ろに'hogehoge'のようなフォールバックを付けられるようにするのがIntegration
      defaultIntegration: new integrations.HttpLambdaIntegration(
        'default',
        apiLambda,
        {}
      ),
    });

    new cdk.CfnOutput(this, 'ApiUrl', { value: apigw.url ?? '' });
  }
}
