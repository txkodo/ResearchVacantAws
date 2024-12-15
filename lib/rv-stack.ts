import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';

export class ResearchVacantStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apigw = new apigatewayv2.HttpApi(this, 'Apigw', {
      // xxx/hogehoge のように，後ろに'hogehoge'のようなフォールバックを付けられるようにするのがIntegration
      defaultIntegration: new integrations.HttpUrlIntegration(
        'default',
        'https://github.com',
        {
          method: apigatewayv2.HttpMethod.ANY,
        }
      ),
    });

    new cdk.CfnOutput(this, 'ApiUrl', { value: apigw.url ?? '' });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ResearchVacantQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
