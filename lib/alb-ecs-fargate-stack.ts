import * as cdk from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecr from 'aws-cdk-lib/aws-ecr'
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns'
import type { Construct } from 'constructs'

export class AlbEcsFargateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const repository = ecr.Repository.fromRepositoryName(
      this,
      'ECRRepository',
      'jaws-beginner-sample',
    )

    const vpc = new ec2.Vpc(this, 'Vpc')
    const cluster = new ecs.Cluster(this, 'Cluster', { vpc })

    const albFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'EcsFargateServiceWithAlb', {
      cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(repository),
      },
      // NOTE: An error may occur if the image platform is not compatible with the platform you are running on.
      //       In that case, uncomment the following
      runtimePlatform: {
        cpuArchitecture: ecs.CpuArchitecture.ARM64,
      },
    })

    new cdk.CfnOutput(this, 'LoadBalancerDns', {
      value: albFargateService.loadBalancer.loadBalancerDnsName,
    })
  }
}
